package game

import (
	"github.com/gofiber/fiber/v2"

	"backend/loaders/hub"
	"backend/types/payload"
	"backend/types/response"
)

func ReadyHandler(c *fiber.Ctx) error {
	// * Load local variables
	player := c.Locals("player").(*hub.Player)

	// * Parse body
	var body *payload.ReadyRequest
	if err := c.BodyParser(&body); err != nil {
		return err
	}

	player.Ready = true

	if player.Room.Player1 != nil && player.Room.Player2 != nil {
		if player.Room.Player1.Ready == true && player.Room.Player2.Ready == true {
			// TODO: Trigger ready
		}
	}

	return c.JSON(response.New("Successfully apply ready state"))
}
