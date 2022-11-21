package main

import (
	"math/rand"
	"time"

	"backend/loaders/fiber"
	"backend/loaders/rtc"
)

func main() {
	rand.Seed(time.Now().UnixNano())

	rtc.Init()
	fiber.Init()
}
