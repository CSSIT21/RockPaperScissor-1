package hub

import (
	"backend/types/enum"
	"backend/types/extend"
)

var Hub = &Model{
	RoomIncrement: 0,
	Rooms:         make(map[uint64]*Room),
}

type Model struct {
	RoomIncrement uint64           `json:"room_increment"`
	Rooms         map[uint64]*Room `json:"rooms"`
}

type Room struct {
	Pin     string    `json:"pin"`
	Player1 *Player   `json:"player1"`
	Player2 *Player   `json:"player2"`
	Rounds  *[]Rounds `json:"rounds"`
}

type Player struct {
	Name     string                `json:"name"`
	Token    string                `json:"token"`
	Ready    bool                  `json:"ready"`
	Room     *Room                 `json:"-"`
	Opponent *Player               `json:"-"`
	WsConn   *extend.WsConnection  `json:"-"`
	RtcConn  *extend.RtcConnection `json:"-"`
}

type Rounds struct {
	Player1Result *enum.Shape `json:"player1_result"`
	Player2Result *enum.Shape `json:"player2_result"`
	Winner        int         `json:"winner"`
}
