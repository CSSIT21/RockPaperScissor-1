package payload

type CreateResponse struct {
	Name  string `json:"name"`
	Pin   string `json:"pin"`
	Token string `json:"token"`
}

type CreateRequest struct {
	Name string `json:"name"`
}

type JoinRequest struct {
	Name string `json:"name"`
	Pin  string `json:"pin"`
}

type JoinResponse struct {
	Name         string `json:"name"`
	OpponentName string `json:"opponent_name"`
	Token        string `json:"token"`
}

type ReadyRequest struct {
	Token string `json:"token"`
}
