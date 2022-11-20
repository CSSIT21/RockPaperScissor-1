package player

import (
	"backend/loaders/hub"
	"backend/types/payload"
	"backend/types/response"
	"github.com/gofiber/fiber/v2"
)

func ReadyHandler(c *fiber.Ctx) error {
	var body *payload.ReadyRequest
	if err := c.BodyParser(&body); err != nil {
		return err
	}

	var room *hub.Room
	var player *hub.Player
	for _, r := range hub.Hub.Room {
		if r.Player1 != nil {
			if r.Player1.Token == body.Token {
				player = r.Player1
				room = r
			}
		}
		if r.Player2 != nil {
			if r.Player2.Token == body.Token {
				player = r.Player2
				room = r
			}
		}
	}

	if player == nil {
		return &response.Error{
			Message: "Your token is not valid",
		}
	}

	player.Ready = true

	if room.Player1 != nil && room.Player2 != nil {
		if room.Player1.Ready == true && room.Player2.Ready == true {
			println("Ready")
		}
	}

	return c.JSON("Ready")
}
