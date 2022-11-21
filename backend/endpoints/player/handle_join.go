package player

import (
	"sync"

	"github.com/gofiber/fiber/v2"
	"github.com/pion/webrtc/v3"

	"backend/loaders/hub"
	"backend/procedures"
	"backend/types/extend"
	"backend/types/payload"
	"backend/types/response"
	"backend/utils/text"
)

func JoinHandler(c *fiber.Ctx) error {
	// * Parse body
	var body *payload.JoinRequest
	if err := c.BodyParser(&body); err != nil {
		return err
	}

	// * Generate random token
	token := text.Random(text.RandomSet.MixedAlphaNum, 12)

	// * Find room by pin
	var room *hub.Room
	for _, r := range hub.Hub.Rooms {
		if r.Pin == body.Pin {
			room = r
		}
	}

	// * Check if room exists
	if room == nil {
		return c.JSON(response.New("Pin is not exist"))
	}

	// * Create player instance
	player := &hub.Player{
		Name:     body.Name,
		Token:    *token,
		Ready:    false,
		Opponent: room.Player1,
		Room:     room,
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

	// * Assign player to room
	room.Player2 = player
	room.Player1.Opponent = player

	room.Player1.WsConn.Emit(procedures.GetSocketPayload(room.Player1))

	return c.JSON(response.New(&payload.JoinResponse{
		Name:         body.Name,
		Token:        *token,
		OpponentName: room.Player1.Name,
	}))
}
