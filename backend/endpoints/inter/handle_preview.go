package inter

import (
	"encoding/json"

	"github.com/gofiber/fiber/v2"

	"backend/loaders/hub"
)

func PreviewHandler(c *fiber.Ctx) error {
	// Set plain text
	c.Set("Content-Type", "text/plain")

	h := hub.Hub

	b, err := json.MarshalIndent(h, "", "  ")
	if err != nil {
		return err
	}

	return c.Send(b)
}
