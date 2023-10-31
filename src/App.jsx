import { createContext, useEffect, useReducer, useRef, useState } from "react"
import HandComponent from "./Hand"
import HandDealer from "./HandDealer"
import BlackJack, { ACTION } from "./gameLogic/BlackJack"
import Hand from "./gameLogic/Hand"
import BasicStrategy from "./BasicStrategy"
import {
  Stack,
  Button,
  Input,
  Chip,
  Card,
  CardContent,
  Typography
} from "@mui/joy"
import CardHolder from "./CardHolder"

const TYPES = [2, 3, 4, 5, 6, 7, 8, 9, "ace", "jack", "king", "queen"]
const COLORS = ["clubs", "diamonds", "hearts", "spades"]

const DEFAULT_STATE = {
  dealerHand: new Hand(0, [], false),
  playerHands: [new Hand(0, [])],
  balance: 0
}

function App() {
  const [blackJack] = useState(new BlackJack())
  const [state, dispatch] = useReducer(createReducer(blackJack), DEFAULT_STATE)
  const [bet, setBet] = useState("")
  const betInput = useRef()

  function createReducer(blackJack) {
    return function reducer(state, reset = false) {
      if (reset) {
        return DEFAULT_STATE
      }
      return blackJack.getState()
    }
  }

  function handleBetInput(input) {
    const value = input.target.value.replace(/[^0-9]/g, "")
    setBet(value)
    if (value === "") return
    blackJack.bet = parseInt(value)
  }

  function reset() {
    blackJack.reset.call(blackJack)
    dispatch(true)
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
        spacing={4}>
        <CardHolder cardCount={20} thikness={0.3} />
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}>
          <Button
            color="neutral"
            onClick={() => executeAction(ACTION.deal)}
            variant="solid"
            fullWidth>
            Deal
          </Button>
          <Button color="neutral" onClick={reset} variant="solid" fullWidth>
            Reset
          </Button>
        </Stack>
        <HandComponent hand={state.dealerHand} key={"dealer"} />
        <CardHolder cardCount={20} thikness={0.3} />
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={4}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}>
          <Card sx={{ boxSizing: "border-box", width: "100%" }} variant="soft">
            <CardContent>
              <Typography level="title-md">Balance: {state.balance}</Typography>
            </CardContent>
          </Card>
          <Input
            color="neutral"
            variant="outlined"
            startDecorator="Bet: "
            onChange={(event) => handleBetInput(event)}
            value={bet}
            ref={betInput}
            fullWidth
          />
        </Stack>

        <Stack justifyContent="center" alignItems="center" spacing={2}>
          <Button
            color="neutral"
            onClick={() => executeAction(ACTION.split)}
            variant="solid"
            fullWidth>
            Split
          </Button>
          <Button
            color="neutral"
            onClick={() => executeAction(ACTION.hit)}
            variant="solid"
            fullWidth>
            Hit
          </Button>
          <Button
            color="neutral"
            onClick={() => executeAction(ACTION.double)}
            variant="solid"
            fullWidth>
            Double
          </Button>
          <Button
            color="neutral"
            onClick={() => executeAction(ACTION.stand)}
            variant="solid"
            fullWidth>
            Stand
          </Button>
        </Stack>
        {state.playerHands.map((hand, index) => (
          <HandComponent hand={hand} key={index} />
        ))}
      </Stack>
    </Stack>
  )
}

export default App
