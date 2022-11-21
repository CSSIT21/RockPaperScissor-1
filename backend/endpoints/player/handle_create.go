package player

import (
	"sync"

	"github.com/gofiber/fiber/v2"
	"github.com/pion/webrtc/v3"

	"backend/loaders/hub"
	"backend/types/extend"
	"backend/types/response"
	"backend/utils/text"

	"backend/types/payload"
)

func CreateHandler(c *fiber.Ctx) error {
	// * Parse body
	var body *payload.CreateRequest
	if err := c.BodyParser(&body); err != nil {
		return err
	}

	// * Generate random pin
	pin := text.Random(text.RandomSet.Num, 6)

	// * Generate random token
	token := text.Random(text.RandomSet.MixedAlphaNum, 12)

	// * Create player instance
	player := &hub.Player{
		Name:     body.Name,
		Token:    *token,
		Ready:    false,
		Room:     nil,
		Opponent: nil,
		WsConn: &extend.WsConnection{
			Conn:  nil,
			Mutex: &sync.Mutex{},
		},
		RtcConn: &extend.RtcConnection{
			Desc:       webrtc.SessionDescription{},
			Peer:       nil,
			LocalTrack: nil,
			RtpPacket:  nil,
		},
	}

	// * Create room instance
	room := &hub.Room{
		Pin:       *pin,
		Countdown: -1,
		Player1:   player,
		Player2:   nil,
		Rounds:    nil,
	}

	// * Assign cycle pointer
	player.Room = room

	// * Add room to hub
	hub.Hub.RoomIncrement++
	hub.Hub.Rooms[hub.Hub.RoomIncrement] = room

	return c.JSON(response.New(&payload.CreateResponse{
		Name:  body.Name,
		Pin:   *pin,
		Token: *token,
	}))
}
