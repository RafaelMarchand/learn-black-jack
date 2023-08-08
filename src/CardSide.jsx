import React from "react"

export default function CardSide({ thikness }) {
  return (
    <div
      style={{
        width: "100%",
        height: `${thikness}em`,
        backgroundColor: "gray"
      }}
    >
      <div
        style={{
          width: "100%",
          height: "20%",
          backgroundColor: "gray"
        }}
      ></div>
      <div
        style={{
          width: "100%",
          height: "80%",
          backgroundColor: "white"
        }}
      ></div>
    </div>
  )
}
