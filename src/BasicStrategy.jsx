import React from "react"
import basicStrategy from "./gameLogic/basicStrategy.json"
import Table from "./Table"

export default function BasicStrategy({ table }) {
  function colorHardTotals(entry) {
    if (entry === "S") return "yellow"
    if (entry === "D") return "green"
    if (entry === "H") return "white"
    return "gray"
  }

  return (
    <div>
      <Table
        table={basicStrategy[table]}
        width={"40em"}
        height={"30em"}
        color={colorHardTotals}
        header={"Hard Totals"}
      />
    </div>
  )
}
