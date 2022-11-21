package rtc

import (
	"time"

	"github.com/pion/interceptor"
	"github.com/pion/webrtc/v3"
)

var C *webrtc.Configuration
var M *webrtc.MediaEngine
var I *interceptor.Registry

const (
	RtcpPliInterval = time.Second * 3
)

func Init() {
	// Create a MediaEngine object to configure the supported codec
	M = &webrtc.MediaEngine{}
	RegisterCodec(M)

	// Create a InterceptorRegistry. This is the user configurable RTP/RTCP Pipeline.
	// This provides NACKs, RTCP Reports and other features. If you use `rtc.NewPeerConnection`
	// this is enabled by default. If you are manually managing You MUST create a InterceptorRegistry
	// for each PeerConnection.
	I = &interceptor.Registry{}
	RegisterInterceptor(I, M)

	// Prepare the configuration
	C = &webrtc.Configuration{
		ICEServers: []webrtc.ICEServer{
			{
				URLs: []string{"stun:stun.l.google.com:19302"},
			},
		},
	}
}
