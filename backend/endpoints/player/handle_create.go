package player

import (
	"backend/loaders/hub"
	"backend/utils/text"
	"github.com/gofiber/fiber/v2"

	"backend/types/payload"
)

func CreateHandler(c *fiber.Ctx) error {
	var body *payload.CreateRequest
	if err := c.BodyParser(&body); err != nil {
		return err
	}

	pin := text.Random(text.RandomSet.Num, 6)

	token := text.Random(text.RandomSet.MixedAlphaNum, 12)

	player := &hub.Player{
		Name:  body.Name,
		Token: *token,
		Ready: false,
		Room:  nil,
		Conn:  nil,
	}

	room := &hub.Room{
		Pin:     *pin,
		Player1: player,
		Player2: nil,
		Rounds:  nil,
	}

	hub.Hub.Room = append(hub.Hub.Room, room)

	s := &payload.CreateResponse{
		Name:  body.Name,
		Pin:   *pin,
		Token: *token,
	}

	return c.JSON(s)
}
