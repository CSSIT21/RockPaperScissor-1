package endpoints

import (
	"github.com/gofiber/fiber/v2"

	"backend/endpoints/inter"
	playerEndpoint "backend/endpoints/player"
	rtcEndpoint "backend/endpoints/rtc"
)

func Register(router fiber.Router) {
	// * Internal
	internal := router.Group("/internal")
	internal.Get("/preview", inter.PreviewHandler)

	// * Player
	player := router.Group("/player")
	player.Post("/create", playerEndpoint.CreateHandler)
	player.Post("/join", playerEndpoint.JoinHandler)
	player.Post("/ready", playerEndpoint.ReadyHandler)

	// * RTC
	rtc := router.Group("/rtc")
	rtc.Post("/offer/sender", rtcEndpoint.SenderHandler)
	rtc.Post("/offer/receiver", rtcEndpoint.ReceiverHandler)
	rtc.Get("/snapshot/image", rtcEndpoint.SnapshotImageHandler)
	rtc.Get("/snapshot/detail", rtcEndpoint.SnapshotDetailHandler)
}
