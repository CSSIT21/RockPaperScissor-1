package player

import (
	"github.com/gofiber/fiber/v2"

	"backend/types/payload"
)

func StateHandler(c *fiber.Ctx) error {
	var body *payload.StateRequest
	if err := c.BodyParser(body); err != nil {
		return err
	}

	s := &payload.StateResponse{
		Name:  body.Name,
		Token: "abcd",
	}

	return c.JSON(s)
}
