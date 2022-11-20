package websocket

import (
	"github.com/gofiber/websocket/v2"
	"github.com/sirupsen/logrus"

	"backend/loaders/hub"
	"backend/loaders/websocket/message"
	"backend/utils/value"
)

func Serve(c *websocket.Conn) {
	// * Validate token
	var player *hub.Player
	for _, room := range hub.Hub.Rooms {
		if room.Player1 != nil && room.Player1.Token == c.Query("token") {
			player = room.Player1
			return
		}
		if room.Player2 != nil && room.Player1.Token == c.Query("token") {
			player = room.Player2
			return
		}
	}

	if player == nil {
		_ = c.Close()
		return
	}

	// * Handle connection switch
	HandleConnectionSwitch(player.WsConn)

	// * Assign connection
	player.WsConn.Mutex.Lock()
	player.WsConn.Conn = c
	player.WsConn.Mutex.Unlock()

	// * Initial emit
	// TODO: Emit initial state

	// * Handle incoming messages
	for {
		t, p, err := c.ReadMessage()
		if err != nil {
			break
		}
		if t != websocket.TextMessage {
			break
		}

		player.WsConn.Emit(&message.OutboundMessage{
			Event:   message.EchoEvent,
			Payload: p,
		})
	}

	// * Close connection
	if err := player.WsConn.Conn.Close(); err != nil {
		logrus.Warn("UNHANDLED CONNECTION CLOSE: " + err.Error())
	}

	// * Reset player connection
	player.WsConn.Conn = nil

	// * Unlock in case of connection switch
	if value.MutexLocked(player.WsConn.Mutex) {
		player.WsConn.Mutex.Unlock()
	}
}
