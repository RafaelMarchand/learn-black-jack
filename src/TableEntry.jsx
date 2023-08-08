import React from "react"

export default function TableEntry({ entry, color, rightMostElement }) {
  let borderWidthRight = 0
  if (rightMostElement) borderWidthRight = 0.01
  if (typeof color === "function") {
    color = color(entry)
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color,
        borderLeft: "0.01em solid black",
        borderTop: "0.01em solid black",
        borderBottom: "0.01em solid black",
        borderRight: `${borderWidthRight}em solid black`
      }}
    >
      <div>{entry}</div>
    </div>
  )
}
