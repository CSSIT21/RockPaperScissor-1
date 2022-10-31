package rtc

import "github.com/pion/webrtc/v3"

type Hub struct {
	Rooms map[string]*Room
}

type Room struct {
	Sender       *Connection
	ReceiverIncr int
	Receiver     map[uint64]*Connection
}

type Connection struct {
	Desc       webrtc.SessionDescription
	Peer       *webrtc.PeerConnection
	LocalTrack *webrtc.TrackLocalStaticRTP
}

var H = &Hub{
	Rooms: map[string]*Room{
		"test": {},
	},
}
