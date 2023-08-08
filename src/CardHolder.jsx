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
        width: "15rem",
        height: "18rem",
        backgroundColor: "transparent",
        borderColor: "transparent black black black",
        borderWidth: "1rem",
        borderStyle: "solid",
        borderBottomRightRadius: "1rem",
        borderBottomLeftRadius: "1rem"
      }}
    >
      {cards}
    </div>
  )
}
