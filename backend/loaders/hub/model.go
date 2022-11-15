package hub

import (
	"golang.org/x/net/websocket"

	"backend/types/enum"
)

var Hub = new(Model)

type Model struct {
	Room []*Room `json:"room"`
}

type Room struct {
	Pin     string    `json:"pin"`
	Player1 *Player   `json:"player1"`
	Player2 *Player   `json:"player2"`
	Rounds  *[]Rounds `json:"rounds"`
}

type Player struct {
	Name  string          `json:"name"`
	Token string          `json:"token"`
	Ready bool            `json:"ready"`
	Room  *Room           `json:"-"`
	Conn  *websocket.Conn `json:"-"`
}

type Rounds struct {
	Player1Result *enum.Shape `json:"player1_result"`
	Player2Result *enum.Shape `json:"player2_result"`
	Winner        int         `json:"winner"`
}
