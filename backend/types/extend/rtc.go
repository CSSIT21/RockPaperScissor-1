package extend

import (
	"github.com/pion/rtp"
	"github.com/pion/webrtc/v3"
)

type RtcConnection struct {
	Desc       webrtc.SessionDescription
	Peer       *webrtc.PeerConnection
	LocalTrack *webrtc.TrackLocalStaticRTP
	RtpPacket  chan *rtp.Packet
}
