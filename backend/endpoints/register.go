package endpoints

import (
	"github.com/gofiber/fiber/v2"

	gameEndpoint "backend/endpoints/game"
	interEndpoint "backend/endpoints/inter"
	playerEndpoint "backend/endpoints/player"
	rtcEndpoint "backend/endpoints/rtc"
	"backend/loaders/fiber/middlewares"
)

func Register(router fiber.Router) {
	// * Internal
	internal := router.Group("/internal")
	internal.Get("/preview", interEndpoint.PreviewHandler)

	// * Player
	player := router.Group("/player")
	player.Post("/create", playerEndpoint.CreateHandler)
	player.Post("/join", playerEndpoint.JoinHandler)

	// * Game
	game := router.Group("/game", middlewares.Player())
	game.Post("/ready", gameEndpoint.ReadyHandler)
	game.Delete("/start", gameEndpoint.StartHandler)

	// * RTC
	rtc := router.Group("/rtc", middlewares.Player())
	rtc.Post("/offer/sender", rtcEndpoint.SenderHandler)
	rtc.Post("/offer/receiver", rtcEndpoint.ReceiverHandler)
	rtc.Get("/snapshot/image", rtcEndpoint.SnapshotImageHandler)
}
