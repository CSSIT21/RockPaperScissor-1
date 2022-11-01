package rtc

import (
	"strconv"

	"github.com/gofiber/fiber/v2"

	"backend/loaders/rtc"
	"backend/types/response"
)

func SnapshotImageHandler(c *fiber.Ctx) error {
	// * Check local track channel
	if rtc.H.Rooms["test"].CachedFrame == nil {
		return &response.Error{
			Message: "No local track",
		}
	}

	// Serve image
	c.Set("Content-Type", "image/jpeg")
	c.Set("Content-Length", strconv.Itoa(len(rtc.H.Rooms["test"].CachedFrame)))

	// Write jpeg as HTTP Response
	if _, err := c.Write(rtc.H.Rooms["test"].CachedFrame); err != nil {
		panic(err)
	}
	return nil
}
