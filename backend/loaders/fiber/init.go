package fiber

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"

	"backend/endpoints"
	"backend/loaders/websocket"

	"backend/utils/config"

	"backend/loaders/fiber/middlewares"
)

var app *fiber.App

func Init() {
	// Initialize instance
	app = fiber.New(fiber.Config{
		ErrorHandler:  errorHandler,
		Prefork:       false,
		StrictRouting: true,
		ReadTimeout:   5 * time.Second,
		WriteTimeout:  5 * time.Second,
	})

	// Initialize API endpoints
	apiGroup := app.Group("api/")
	apiGroup.Use(middlewares.Limiter)
	apiGroup.Use(middlewares.Cors)
	apiGroup.Use(middlewares.Recover)
	endpoints.Register(apiGroup)

	// 	Initialize websocket endpoints
	wsGroup := app.Group("ws/")
	websocket.Init(wsGroup)

	// Initialize not found handler
	app.Use(notfoundHandler)

	// Start listening
	err := app.ListenTLS(config.C.Address, "../frontend/res/cert.pem", "../frontend/res/key.pem")
	if err != nil {
		logrus.Fatal(err.Error())
	}
}
