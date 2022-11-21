package game

import (
	"time"

	"github.com/gofiber/fiber/v2"

	"backend/loaders/hub"
	"backend/procedures"
	"backend/types/enum"
	"backend/types/response"
)

func StartHandler(c *fiber.Ctx) error {
	// * Load local variables
	player := c.Locals("player").(*hub.Player)

	if player.Room.Player2 == nil {
		return &response.Error{
			Message: "No opponent",
		}
	}

	go func() {
		ticker := time.NewTicker(1 * time.Second)
		defer ticker.Stop()

		player.Room.Countdown = 3
		for {
			select {
			case <-ticker.C:
				player.WsConn.Emit(procedures.GetSocketPayload(player))
				player.Opponent.WsConn.Emit(procedures.GetSocketPayload(player.Opponent))
			}
			if player.Room.Countdown == -1 {
				var result1 *enum.Shape
				var result2 *enum.Shape

				finish := make(chan bool, 2)
				go func() {
					result1 = procedures.Capture(player.Room.Player1)
					finish <- true
				}()
				go func() {
					result2 = procedures.Capture(player.Room.Player2)
					finish <- true
				}()

				<-finish
				<-finish
				winner := 0

				if result1 == nil || result2 == nil {
					player.Room.Countdown = -2
					goto emit
				}

				if *result1 == enum.ShapePaper && *result2 == enum.ShapeRock {
					winner = 1
				}
				if *result1 == enum.ShapeRock && *result2 == enum.ShapeScissor {
					winner = 1
				}
				if *result1 == enum.ShapeScissor && *result2 == enum.ShapePaper {
					winner = 1
				}
				if *result1 == enum.ShapeRock && *result2 == enum.ShapePaper {
					winner = 2
				}
				if *result1 == enum.ShapeScissor && *result2 == enum.ShapeRock {
					winner = 2
				}
				if *result1 == enum.ShapePaper && *result2 == enum.ShapeScissor {
					winner = 2
				}

				player.Room.Rounds = append(player.Room.Rounds, &hub.Rounds{
					Player1Result: *result1,
					Player2Result: *result2,
					Winner:        winner,
				})

				if len(player.Room.Rounds) >= 3 {
					go func() {
						time.Sleep(3 * time.Second)
						player1Score := 0
						player2Score := 0
						for _, round := range player.Room.Rounds {
							if round.Winner == 1 {
								player1Score++
							}
							if round.Winner == 2 {
								player2Score++
							}
						}
						if player1Score > player2Score {
							player.Room.Winner = 1
						}
						if player1Score < player2Score {
							player.Room.Winner = 2
						}
						player.Room.Player1.WsConn.Emit(procedures.GetSocketPayload(player.Room.Player1))
						player.Room.Player2.WsConn.Emit(procedures.GetSocketPayload(player.Room.Player2))
					}()
				} else {
					player.Room.Countdown = -2
				}

			emit:
				player.Room.Player1.WsConn.Emit(procedures.GetSocketPayload(player.Room.Player1))
				player.Room.Player2.WsConn.Emit(procedures.GetSocketPayload(player.Room.Player2))

				break
			} else {
				player.Room.Countdown--
			}
		}
	}()

	return c.JSON(response.New("Successfully start game"))
}
