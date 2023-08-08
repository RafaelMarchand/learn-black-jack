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
        width: "15em",
        height: "18em",
        backgroundColor: "transparent",
        borderColor: "transparent black black black",
        borderWidth: "1em",
        borderStyle: "solid",
        borderBottomRightRadius: "1em",
        borderBottomLeftRadius: "1em"
      }}
    >
      {cards}
    </div>
  )
}
