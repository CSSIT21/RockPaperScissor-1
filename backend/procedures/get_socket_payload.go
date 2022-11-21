package procedures

import (
	"backend/loaders/hub"
	"backend/loaders/websocket/message"
	"backend/types/payload"
)

func GetSocketPayload(player *hub.Player) *message.OutboundMessage {
	var me int
	if player == player.Room.Player1 {
		me = 1
	}
	if player == player.Room.Player2 {
		me = 2
	}

	return &message.OutboundMessage{
		Event: message.GameState,
		Payload: &payload.StatePayload{
			Me:   me,
			Room: player.Room,
		},
	}
}
