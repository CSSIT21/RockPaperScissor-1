package rtc

import (
	"errors"
	"fmt"
	"io"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/pion/rtcp"
	"github.com/pion/rtp"
	"github.com/pion/webrtc/v3"

	"backend/loaders/hub"
	"backend/loaders/rtc"
	"backend/types/payload"
	"backend/types/response"
	"backend/utils/text"
)

func SenderHandler(c *fiber.Ctx) error {
	// * Load local variables
	player := c.Locals("player").(*hub.Player)

	var req *payload.RtcSdpRequest
	if err := c.BodyParser(&req); err != nil {
		return err
	}

	if err := text.Validator.Struct(req); err != nil {
		return err
	}

	if player.RtcConn.Peer != nil {
		_ = player.RtcConn.Peer.Close()
		return &response.Error{
			Message: "Sender already exists",
		}
	}

	// * Create session description
	offer := webrtc.SessionDescription{}
	rtc.Decode(req.Description, &offer)

	// * Create peer connection
	peer, err := webrtc.NewPeerConnection(*rtc.C)
	if err != nil {
		return &response.Error{
			Message: "Unable to create peer connection",
			Err:     err,
		}
	}

	// * Allow to receive 1 video track
	if _, err = peer.AddTransceiverFromKind(webrtc.RTPCodecTypeVideo); err != nil {
		return &response.Error{
			Message: "Unable to add transceiver",
			Err:     err,
		}
	}

	// * Local track channel
	localTrackChan := make(chan *webrtc.TrackLocalStaticRTP)
	rtpChan := make(chan *rtp.Packet)

	peer.OnTrack(func(track *webrtc.TrackRemote, receiver *webrtc.RTPReceiver) {
		// Send a PLI on an interval so that the publisher is pushing a keyframe every rtcpPLIInterval
		// This can be less wasteful by processing incoming RTCP events, then we would emit a NACK/PLI when a viewer requests it
		go func() {
			ticker := time.NewTicker(rtc.RtcpPliInterval)
			for range ticker.C {
				if rtcpSendErr := peer.WriteRTCP([]rtcp.Packet{&rtcp.PictureLossIndication{MediaSSRC: uint32(track.SSRC())}}); rtcpSendErr != nil {
					fmt.Println("TAG1", rtcpSendErr)
				}
			}
		}()

		// Create a local track, all our SFU clients will be fed via this track
		localTrack, newTrackErr := webrtc.NewTrackLocalStaticRTP(track.Codec().RTPCodecCapability, "video", "pion")
		if newTrackErr != nil {
			panic(newTrackErr)
		}

		localTrackChan <- localTrack

		for {
			// Read RTP Packets in a loop
			rtpPacket, _, err := track.ReadRTP()
			if err != nil {
				break
			}

			rtpBuf, err := rtpPacket.Marshal()
			if err != nil {
				panic(err)
			}

			// ErrClosedPipe means we don't have any subscribers, this is ok if no peers have connected yet
			if _, err = localTrack.Write(rtpBuf); err != nil && !errors.Is(err, io.ErrClosedPipe) {
				panic(err)
			}

			// Use a lossy channel to send packets to snapshot handler
			// We don't want to block and queue up old data
			if player.RtcConn.Capturing {
				rtpChan <- rtpPacket
			}
		}
	})

	// Set the remote SessionDescription
	err = peer.SetRemoteDescription(offer)
	if err != nil {
		return &response.Error{
			Message: "Unable to set remote description",
			Err:     err,
		}
	}

	// Create answer
	answer, err := peer.CreateAnswer(nil)
	if err != nil {
		return &response.Error{
			Message: "Unable to create answer",
			Err:     err,
		}
	}

	// Create channel that is blocked until ICE Gathering is complete
	gatherComplete := webrtc.GatheringCompletePromise(peer)

	// Sets the LocalDescription, and starts our UDP listeners
	if err = peer.SetLocalDescription(answer); err != nil {
		return &response.Error{
			Message: "Unable to set local description",
			Err:     err,
		}
	}

	// Block until ICE Gathering is complete, disabling trickle ICE
	// we do this because we only can exchange one signaling message
	// in a production application you should exchange ICE Candidates via OnICECandidate
	<-gatherComplete

	// * Save sender
	player.RtcConn.Peer = peer
	player.RtcConn.Desc = offer
	player.RtcConn.LocalTrack = nil
	player.RtcConn.RtpPacket = rtpChan

	go func() {
		player.RtcConn.LocalTrack = <-localTrackChan
	}()

	return c.JSON(response.New(map[string]any{
		"answer": rtc.Encode(peer.LocalDescription()),
	}))
}
