package payload

import "backend/loaders/hub"

type StatePayload struct {
	Me   int       `json:"me"`
	Room *hub.Room `json:"room"`
}
