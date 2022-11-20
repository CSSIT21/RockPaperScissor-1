package player

import (
	"backend/loaders/hub"
	"backend/types/payload"
	"backend/types/response"
	"backend/utils/text"
	"github.com/gofiber/fiber/v2"
)

func JoinHandler(c *fiber.Ctx) error {
	var body *payload.JoinRequest
	if err := c.BodyParser(&body); err != nil {
		return err
	}

	token := text.Random(text.RandomSet.MixedAlphaNum, 12)

	var room *hub.Room
	for _, r := range hub.Hub.Room {
		if r.Pin == body.Pin {
			room = r
		}
	}

	if room == nil {
		return &response.Error{
			Message: "Your pin is not valid",
		}
	}

	player := &hub.Player{
		Name:  body.Name,
		Token: *token,
		Ready: false,
		Room:  nil,
		Conn:  nil,
	}

	room.Player2 = player

	s := &payload.JoinResponse{
		Name:         body.Name,
		Token:        *token,
		OpponentName: room.Player1.Name,
	}

	return c.JSON(s)
}
