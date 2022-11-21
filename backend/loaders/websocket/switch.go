package websocket

import (
	"github.com/gofiber/websocket/v2"
	"github.com/sirupsen/logrus"

	"backend/loaders/websocket/message"
	"backend/types/extend"
	"backend/utils/value"
)

func HandleConnectionSwitch(conn *extend.WsConnection) {
	// * Connection switch
	if conn != nil && conn.Conn != nil {
		conn.Emit(&message.OutboundMessage{
			Event:   message.ConnectionSwitchEvent,
			Payload: nil,
		})

		conn.Mutex.Lock()
		if err := value.ErrorChain(
			conn.Conn.WriteMessage(websocket.CloseMessage, []byte{}),
			conn.Conn.Close(),
		); err != nil {
			logrus.Warn("UNHANDLED PLAYER CONN SWITCH: " + err.Error())
		}
	}
}
