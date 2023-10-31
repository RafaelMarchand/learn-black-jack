import React from "react"
import CardSide from "./CardSide"

export default function CardHolder({ cardCount, thikness }) {
  const cards = []
  for (let i = 0; i < cardCount; i++) {
    cards.push(<CardSide thikness={thikness} key={i} />)
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        width: "11rem",
        height: "14rem",
        backgroundColor: "transparent",
        borderColor: "transparent #554F4F #554F4F #554F4F",
        borderWidth: "0.5rem",
        borderStyle: "solid",
        borderBottomRightRadius: "0.6rem",
        borderBottomLeftRadius: "0.6rem"
      }}
    >
      {cards}
    </div>
  )
}
