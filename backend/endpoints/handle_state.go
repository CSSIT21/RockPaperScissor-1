package endpoints

import "github.com/gofiber/fiber/v2"

type response struct {
	Name  string `json:"name"`
	Token string `json:"token"`
}

type request struct {
	Name string `json:"name"`
}

func handler(c *fiber.Ctx) error {
	body := new(request)
	if err := c.BodyParser(body); err != nil {
		return err
	}

	s := &response{
		Name:  body.Name,
		Token: "abcd",
	}

	return c.JSON(s)
}
