package rtc

import (
	"github.com/pion/rtp"
	"github.com/pion/webrtc/v3"
)

type Hub struct {
	Rooms map[string]*Room
}

type Room struct {
	Sender       *Connection
	CachedFrame  []byte
	ReceiverIncr int
	Receiver     map[uint64]*Connection
}

type Connection struct {
	Desc       webrtc.SessionDescription
	Peer       *webrtc.PeerConnection
	LocalTrack *webrtc.TrackLocalStaticRTP
	RtpPacket  chan *rtp.Packet
}

var H = &Hub{
	Rooms: map[string]*Room{
		"test": {},
	},
}
