package endpoints

import "github.com/gofiber/fiber/v2"

func Register(router fiber.Router) {
	// * Player
	player := router.Group("/player")
	player.Post("/state", handler)
}
