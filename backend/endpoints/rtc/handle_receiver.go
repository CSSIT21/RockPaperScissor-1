package rtc

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pion/webrtc/v3"

	"backend/loaders/hub"
	"backend/loaders/rtc"
	"backend/types/payload"
	"backend/types/response"
	"backend/utils/text"
)

func ReceiverHandler(c *fiber.Ctx) error {
	// * Load local variables
	player := c.Locals("player").(*hub.Player)

	// * Parse body
	var req *payload.RtcSdpRequest
	if err := c.BodyParser(&req); err != nil {
		return err
	}

	// * Validate body
	if err := text.Validator.Struct(req); err != nil {
		return err
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

	// * Check local track channel
	if player.RtcConn.LocalTrack == nil {
		return &response.Error{
			Message: "No local track",
		}
	}

	rtpSender, err := peer.AddTrack(player.Opponent.RtcConn.LocalTrack)
	if err != nil {
		return &response.Error{
			Message: "Unable to add track",
			Err:     err,
		}
	}

	go func() {
		rtcpBuf := make([]byte, 1500)
		for {
			if _, _, rtcpErr := rtpSender.Read(rtcpBuf); rtcpErr != nil {
				return
			}
		}
	}()

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

	return c.JSON(response.New(map[string]any{
		"answer": rtc.Encode(peer.LocalDescription()),
	}))
}
