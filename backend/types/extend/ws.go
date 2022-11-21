package extend

import (
	"sync"

	"github.com/gofiber/websocket/v2"
	"github.com/sirupsen/logrus"

	"backend/loaders/websocket/message"
)

type WsConnection struct {
	Conn  *websocket.Conn
	Mutex *sync.Mutex
}

func (r *WsConnection) Emit(payload *message.OutboundMessage) {
	if r.Conn == nil || r.Conn.Conn == nil {
		return
	}

	r.Mutex.Lock()
	if err := r.Conn.WriteJSON(payload); err != nil {
		logrus.Warn("WRITING MESSAGE FAILURE FOR WS: %s", err.Error())
	}
	r.Mutex.Unlock()
}
