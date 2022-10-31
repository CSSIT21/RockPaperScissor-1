package payload

type StateResponse struct {
	Name  string `json:"name"`
	Token string `json:"token"`
}

type StateRequest struct {
	Name string `json:"name"`
}
