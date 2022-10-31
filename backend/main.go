package main

import (
	"backend/loaders/fiber"
	"backend/loaders/rtc"
)

func main() {
	rtc.Init()
	fiber.Init()
}
