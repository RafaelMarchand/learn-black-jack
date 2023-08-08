import React from "react"
import TableEntry from "./TableEntry"

export default function Table({ table, width, height, color, header }) {
  let rows = []
  for (const [key, value] of Object.entries(table)) {
    let currentRow = [key, ...value]
    rows.push(currentRow)
  }
  rows.reverse()
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: height,
        width: width
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div>{header}</div>
      </div>
      {rows.map((row, index) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            width: "100%"
          }}
          key={index}
        >
          {row.map((label, indexRow) => (
            <TableEntry
              entry={label}
              color={color}
              key={indexRow}
              rightMostElement={row.length - 1 === indexRow}
            ></TableEntry>
          ))}
        </div>
      ))}
    </div>
  )
}
