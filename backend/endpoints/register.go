package endpoints

import (
	"github.com/gofiber/fiber/v2"

	playerEndpoint "backend/endpoints/player"
	rtcEndpoint "backend/endpoints/rtc"
)

func Register(router fiber.Router) {
	// * Player
	player := router.Group("/player")
	player.Post("/state", playerEndpoint.StateHandler)

	// * RTC
	rtc := router.Group("/rtc")
	rtc.Post("/offer/sender", rtcEndpoint.SenderHandler)
}
