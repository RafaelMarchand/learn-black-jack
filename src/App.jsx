import { createContext, useEffect, useReducer, useRef, useState } from "react"
import HandComponent from "./Hand"
import HandDealer from "./HandDealer"
import BlackJack, { ACTION } from "./gameLogic/BlackJack"
import Hand from "./gameLogic/Hand"
import BasicStrategy from "./BasicStrategy"
import { Stack, Button } from "@mui/joy"
import CardHolder from "./CardHolder"

const TYPES = [2, 3, 4, 5, 6, 7, 8, 9, "ace", "jack", "king", "queen"]
const COLORS = ["clubs", "diamonds", "hearts", "spades"]

const DEFAULT_STATE = {
  dealerHand: new Hand(0, [], false),
  playerHands: [new Hand(0, [])],
  balance: 0
}

function createReducer(blackJack) {
  return function reducer() {
    return blackJack.getState()
  }
}

function App() {
  const [blackJack] = useState(new BlackJack())
  const [state, dispatch] = useReducer(createReducer(blackJack), DEFAULT_STATE)

  function handleBetInput(input) {
    if (input === "") {
      blackJack.bet = 0
    } else {
      blackJack.bet = parseInt(input)
    }
  }

  function executeAction(action) {
    blackJack.action.call(blackJack, action, dispatch)
  }

  return (
    <Stack justifyContent="space-evenly" spacing={2}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Button color="neutral" onClick={function () {}} variant="solid">
          Deal
        </Button>
        <Button color="neutral" onClick={function () {}} variant="solid">
          Reset
        </Button>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CardHolder cardCount={20} thikness={0.3} />
        <HandDealer hand={state.dealerHand} key={"dealer"} />
        <CardHolder cardCount={20} thikness={0.3} />
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Button color="neutral" onClick={function () {}} variant="solid">
          Split
        </Button>
        <Button color="neutral" onClick={function () {}} variant="solid">
          Hit
        </Button>
        <Button color="neutral" onClick={function () {}} variant="solid">
          Double
        </Button>
        <Button color="neutral" onClick={function () {}} variant="solid">
          Stand
        </Button>
      </Stack>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <button onClick={() => executeAction(ACTION.deal)}>Deal</button>
            <button onClick={blackJack.reset.bind(blackJack, dispatch)}>
              Reset
            </button>
            <input
              type="number"
              onChange={(e) => handleBetInput(e.target.value)}
            />
          </div>

          <div>
            <button onClick={() => executeAction(ACTION.split)}>Split</button>
            <button onClick={() => executeAction(ACTION.hit)}>Hit</button>
            <button onClick={() => executeAction(ACTION.double)}>Double</button>
            <button onClick={() => executeAction(ACTION.stand)}>Stand</button>
            <div
              style={{ display: "inline-block" }}
            >{`Balance: ${state.balance}`}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {state.playerHands.map((hand, index) => (
              <HandComponent hand={hand} key={index} />
            ))}
          </div>
        </div>
        <div>{`Best Action: ${blackJack.bestAction}`}</div>
        <BasicStrategy table={"hard_totals"} />
      </div>
    </Stack>
  )
}

export default App
