import React from "react"
import Card from "./Card"

export default function Hand({ hand }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {hand.isPlayer && (
        <div
          style={{
            width: "15em",
            height: "2em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div>{`Bet: ${hand.bet}`}</div>
        </div>
      )}

      <div style={{ position: "relative", height: "23rem", width: "15rem" }}>
        {hand.cards &&
          hand.cards.map((card, index) => {
            let position = index * 17
            return (
              <div
                key={card.imageUrl}
                style={{
                  position: "absolute",
                  top: `${position}%`,
                  left: "0",
                  width: "100%",
                  height: "100%"
                }}
              >
                <Card card={card} />
              </div>
            )
          })}
      </div>
    </div>
  )
}
