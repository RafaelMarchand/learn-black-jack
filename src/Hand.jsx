import React from "react"
import Card from "./Card"
import { Chip, Typography } from "@mui/joy"

export default function Hand({ hand }) {
  const COLUMN_WIDTH = 4
  const CARD_SPAN = 4

  const columnCount1 = `${hand.cards.length * 1 + CARD_SPAN}`
  const columnCount =
    hand.cards.length > 1 ? hand.cards.length - 1 + CARD_SPAN : CARD_SPAN
  const widthContainer =
    hand.cards.length > 1
      ? `${(hand.cards.length + 2) * COLUMN_WIDTH}rem`
      : `${COLUMN_WIDTH * 3}rem`
  return (
    <div style={{ width: widthContainer }}>
      {hand.isPlayer && (
        <div
          style={{
            width: "15rem",
            height: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Typography level="title-md">Bet: {hand.bet}</Typography>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
          gridTemplateRows: "1fr",
          height: "20rem",
          width: "100%"
        }}>
        {hand.cards &&
          hand.cards.map((card, index) => {
            return (
              <div
                key={card.imageUrl}
                style={{
                  gridColumnStart: `${index + 1}`,
                  gridColumnEnd: `${index + 1 + CARD_SPAN}`,
                  gridRowStart: "1",
                  width: "100%",
                  height: "100%"
                }}>
                <Card card={card} />
              </div>
            )
          })}
      </div>
    </div>
  )
}
