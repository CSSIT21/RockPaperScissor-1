package middlewares

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

var Cors = func() fiber.Handler {
	config := cors.Config{
		AllowCredentials: true,
	}
 
	return cors.New(config)
}()
