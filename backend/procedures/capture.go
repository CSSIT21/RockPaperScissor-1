package procedures

import (
	"bytes"
	"fmt"
	"image/jpeg"
	"os"
	"os/exec"
	"strings"

	"github.com/pion/rtp/codecs"
	"github.com/pion/webrtc/v3/pkg/media"
	"github.com/pion/webrtc/v3/pkg/media/samplebuilder"
	"golang.org/x/image/vp8"

	"backend/loaders/hub"
	"backend/types/enum"
	"backend/utils/text"
)

func Capture(player *hub.Player) *enum.Shape {
	player.RtcConn.Capturing = true

	// * Build channel
	sampleBuilder := samplebuilder.New(40, &codecs.VP8Packet{}, 90000)
	decoder := vp8.NewDecoder()
	var sample *media.Sample

	for {
		// Pull RTP Packet from rtpChan
		sampleBuilder.Push(<-player.RtcConn.RtpPacket)

		// Use SampleBuilder to generate full picture from many RTP Packets
		sample = sampleBuilder.Pop()
		if sample == nil {
			continue
		}

		// Read VP8 header
		videoKeyframe := sample.Data[0]&0x1 == 0
		if !videoKeyframe {
			continue
		}

		player.RtcConn.Capturing = false
		break
	}

	// Begin VP8-to-image decode: Init -> DecodeFrameHeader -> DecodeFrame
	decoder.Init(bytes.NewReader(sample.Data), len(sample.Data))

	// Decode header
	if _, err := decoder.DecodeFrameHeader(); err != nil {
		panic(err)
	}

	// Decode Frame
	img, err := decoder.DecodeFrame()
	if err != nil {
		panic(err)
	}

	// Encode to (RGB) jpeg
	buffer := new(bytes.Buffer)
	if err = jpeg.Encode(buffer, img, nil); err != nil {
		panic(err)
	}

	frame := buffer.Bytes()
	filename := fmt.Sprintf("/tmp/images_%s.jpeg", *text.Random(text.RandomSet.MixedAlphaNum, 8))

	err = os.WriteFile(filename, frame, 0644)
	if err != nil {
		panic(err)
	}

	cmd := exec.Command("/Volumes/Data/Environments/ds/bin/python3", "/Volumes/Data/Repos/RockPaperScissor-1/python/detect.py", filename)
	stdout, err := cmd.Output()
	out := string(stdout)
	var result *enum.Shape
	if strings.Contains(out, "rock") {
		result = &enum.ShapeRock
	}
	if strings.Contains(out, "paper") {
		result = &enum.ShapePaper
	}
	if strings.Contains(out, "scissor") {
		result = &enum.ShapeScissor
	}
	return result
}
