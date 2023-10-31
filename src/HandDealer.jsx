import React from "react"
import Card from "./Card"

export default function HandDealer({ hand }) {
  let width = `${hand.cards.length + 15}rem`
  let columnCount = `${hand.cards.length + 3}`
  // 15rem = card width
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {hand.isPlayer && (
        <div
          style={{
            width: "15rem",
            height: "2rem",
            textAlign: "center",
            verticalAlign: "middle"
          }}
        >
          {hand.bet}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columnCount + 3}, 1fr)`,
          height: "23rem",
          width: `${width}`
        }}
      >
        {hand.cards &&
          hand.cards.map((card, index) => {
            return (
              <div
                key={card.imageUrl}
                style={{
                  gridColumnStart: `${index}`,
                  gridColumnEnd: `${index + 3}`,
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
