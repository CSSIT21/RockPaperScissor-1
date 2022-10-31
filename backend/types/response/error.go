package response

type Error struct {
	Code    string
	Message string
	Err     error
}

func (v *Error) Error() string {
	return v.Message
}
