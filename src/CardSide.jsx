import React from "react"

export default function CardSide({ thikness }) {
  return (
    <div
      style={{
        width: "100%",
        height: `${thikness}em`
      }}
    >
      <div
        style={{
          width: "100%",
          height: "15%",
          backgroundColor: "#D3D3D3",
          borderTopLeftRadius: "0.1rem",
          borderTopRightRadius: "0.1rem"
        }}
      ></div>
      <div
        style={{
          width: "100%",
          height: "15%",
          backgroundColor: "#E9E9E9"
        }}
      ></div>
      <div
        style={{
          width: "100%",
          height: "70%",
          backgroundColor: "#F6F6F6",
          borderBottomLeftRadius: "0.1rem",
          borderBottomRightRadius: "0.1rem"
        }}
      ></div>
    </div>
  )
}
