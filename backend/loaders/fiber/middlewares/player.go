package middlewares

import (
	"github.com/gofiber/fiber/v2"

	"backend/loaders/hub"
	"backend/types/response"
)

var Player = func() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		var player *hub.Player
		for _, room := range hub.Hub.Rooms {
			if room.Player1 != nil && "Bearer "+room.Player1.Token == ctx.Get("Authorization") {
				player = room.Player1
			}
			if room.Player2 != nil && "Bearer "+room.Player1.Token == ctx.Get("Authorization") {
				player = room.Player2
			}
		}

		if player == nil {
			return ctx.Status(fiber.StatusUnauthorized).JSON(response.New("Unauthorized"))
		}

		ctx.Locals("player", player)
		return ctx.Next()
	}
}
