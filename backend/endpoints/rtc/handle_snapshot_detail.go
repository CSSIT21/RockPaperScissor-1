package rtc

import (
	"github.com/gofiber/fiber/v2"
)

func SnapshotDetailHandler(c *fiber.Ctx) error {
	// * Check local track channel
	// if rtc.H.Rooms["test"].Sender.LocalTrack == nil {
	// 	return &response.Error{
	// 		Message: "No local track",
	// 	}
	// }
	//
	// // * Build channel
	// sampleBuilder := samplebuilder.New(20, &codecs.VP8Packet{}, 90000)
	// decoder := vp8.NewDecoder()
	//
	// for {
	// 	// Pull RTP Packet from rtpChan
	// 	sampleBuilder.Push(<-rtc.H.Rooms["test"].Sender.RtpPacket)
	//
	// 	// Use SampleBuilder to generate full picture from many RTP Packets
	// 	sample := sampleBuilder.Pop()
	// 	if sample == nil {
	// 		continue
	// 	}
	//
	// 	// Read VP8 header.
	// 	videoKeyframe := sample.Data[0]&0x1 == 0
	// 	if !videoKeyframe {
	// 		continue
	// 	}
	//
	// 	// Begin VP8-to-image decode: Init->DecodeFrameHeader->DecodeFrame
	// 	decoder.Init(bytes.NewReader(sample.Data), len(sample.Data))
	//
	// 	// Decode header
	// 	if _, err := decoder.DecodeFrameHeader(); err != nil {
	// 		panic(err)
	// 	}
	//
	// 	// Decode Frame
	// 	img, err := decoder.DecodeFrame()
	// 	if err != nil {
	// 		panic(err)
	// 	}
	//
	// 	// Encode to (RGB) jpeg
	// 	buffer := new(bytes.Buffer)
	// 	if err = jpeg.Encode(buffer, img, nil); err != nil {
	// 		panic(err)
	// 	}
	//
	// 	rtc.H.Rooms["test"].CachedFrame = buffer.Bytes()
	//
	// 	err = os.WriteFile("/tmp/images3432.jpeg", rtc.H.Rooms["test"].CachedFrame, 0644)
	// 	if err != nil {
	// 		panic(err)
	// 	}
	//
	// 	c.Set("Content-Type", "text/plain")
	// 	cmd := exec.Command("/Volumes/Data/Environments/ds/bin/python3", "/Volumes/Data/Forks/RockPaperScissor-1/python/detect.py")
	// 	stdout, err := cmd.Output()
	// 	_, _ = c.Write(stdout)
	// 	return nil
	// }

	return nil
}

