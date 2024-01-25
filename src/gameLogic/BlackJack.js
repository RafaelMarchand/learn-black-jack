import Player from "./Player"
import Card from "./Card"
import Hand from "./Hand"
import basicStrategy from "./basicStrategy.json"

const DEK = [
  new Card("clubs", 2),
  new Card("clubs", 3),
  new Card("clubs", 4),
  new Card("clubs", 5),
  new Card("clubs", 6),
  new Card("clubs", 7),
  new Card("clubs", 8),
  new Card("clubs", 9),
  new Card("clubs", 10),
  new Card("clubs", "ace"),
  new Card("clubs", "jack"),
  new Card("clubs", "king"),
  new Card("clubs", "queen"),
  new Card("diamonds", 2),
  new Card("diamonds", 3),
  new Card("diamonds", 4),
  new Card("diamonds", 5),
  new Card("diamonds", 6),
  new Card("diamonds", 7),
  new Card("diamonds", 8),
  new Card("diamonds", 9),
  new Card("diamonds", 10),
  new Card("diamonds", "ace"),
  new Card("diamonds", "jack"),
  new Card("diamonds", "king"),
  new Card("diamonds", "queen"),
  new Card("hearts", 2),
  new Card("hearts", 3),
  new Card("hearts", 4),
  new Card("hearts", 5),
  new Card("hearts", 6),
  new Card("hearts", 7),
  new Card("hearts", 8),
  new Card("hearts", 9),
  new Card("hearts", 10),
  new Card("hearts", "ace"),
  new Card("hearts", "jack"),
  new Card("hearts", "king"),
  new Card("hearts", "queen"),
  new Card("spades", 2),
  new Card("spades", 3),
  new Card("spades", 4),
  new Card("spades", 5),
  new Card("spades", 6),
  new Card("spades", 7),
  new Card("spades", 8),
  new Card("spades", 9),
  new Card("spades", 10),
  new Card("spades", "ace"),
  new Card("spades", "jack"),
  new Card("spades", "king"),
  new Card("spades", "queen")
]

const STATES = {
  start: 0,
  cardsDealt: 1,
  dealerHitting: 2,
  dealerDone: 3
}

export const ACTION = {
  reset: "reset",
  deal: "deal",
  hit: "hit",
  split: "split",
  double: "double",
  stand: "stand",
  none: "none"
}

export default class BlackJack {
  constructor() {
    this.player = new Player("Rafael", 1000)
    this.bet = 0
    this.dealerHand = new Hand(0, [], false)
    this.cards = Array.from(DEK)
    this.cardsDealt = []
    this.state = STATES.start
    this.doubleAfterSplit = true
    this.bestAction = ACTION.none

    console.log("constructor")
  }

  action(action, dispatch) {
    switch (this.state) {
      case STATES.start:
        if (action === ACTION.deal) {
          this.deal()
          this.state = STATES.cardsDealt
        }
        break
      case STATES.cardsDealt:
        this.bestAction = this.basicStrategyAction()
        this.player.action(action, () => this.getRandomCard())
        if (this.player.isRoundOver) {
          this.state = STATES.dealerHitting
          dispatch()
          this.delayedAction(ACTION.none, dispatch)
        }
        break
      case STATES.dealerHitting:
        this.dealerHand.hit(this.getRandomCard())
        if (this.dealerHand.dealerDoneHitting()) {
          this.state = STATES.dealerDone
          dispatch()
          this.action(ACTION.none, dispatch)
        } else {
          this.delayedAction(ACTION.none, dispatch)
        }
        break
      case STATES.dealerDone:
        this.player.calculateBalance(this.dealerHand)
        this.state = STATES.start
        break
    }
    dispatch()
  }

  delayedAction(action, dispatch) {
    setTimeout(() => {
      this.action(action, dispatch)
    }, 1000)
  }

  reset() {
    this.state = STATES.start
    this.cards = Array.from(DEK)
    this.cardsDealt = []
    this.dealerHand = new Hand(0, [], false)
    this.player.clear()
  }

  clearTable() {
    this.cardsDealt = [...this.cardsDealt, ...this.dealerHand.cards]
    this.dealerHand = new Hand(0, [], false)
    let cardsPlayer = this.player.clear()
    this.cardsDealt = [...this.cardsDealt, ...cardsPlayer]
  }

  deal() {
    this.clearTable()
    this.dealerHand.hit(this.getRandomCard())
    this.player.deal(this.bet, [this.getRandomCard(), this.getRandomCard()])
  }

  getRandomCard() {
    let index = Math.floor(Math.random() * this.cards.length)
    return this.cards.splice(index, 1)[0]
  }

  getState() {
    return {
      dealerHand: this.dealerHand,
      playerHands: this.player.hands,
      balance: this.player.balance
    }
  }

  basicStrategyAction() {
    const column = this.dealerHand.cards[0].value - 2
    const handPlayer = this.player.getHand()
    const { pair_splitting, soft_totals, hard_totals } = basicStrategy

    if (handPlayer.splittable()) {
      const bestAction = pair_splitting[`${handPlayer.cards[0].value}`][column]
      if (bestAction === "Y") return ACTION.split
      if (bestAction === "YN" && this.doubleAfterSplit) return ACTION.split
    }
    if (handPlayer.soft) {
      const bestAction = soft_totals[`${handPlayer.value()}`][column]
      if (bestAction === "S") return ACTION.stand
      if (bestAction === "H") return ACTION.hit
      if (bestAction === "D" && handPlayer.doubleAllowed()) return ACTION.double
      if (bestAction === "D" && !handPlayer.doubleAllowed()) return ACTION.hit
      if (bestAction === "DS" && handPlayer.doubleAllowed()) return ACTION.double
      if (bestAction === "DS" && !handPlayer.doubleAllowed()) return ACTION.stand
    }
    const bestAction = hard_totals[`${handPlayer.value()}`][column]
    if (bestAction === "S") return ACTION.stand
    if (bestAction === "H") return ACTION.hit
    if (bestAction === "D" && handPlayer.doubleAllowed()) return ACTION.double
    if (bestAction === "D" && !handPlayer.doubleAllowed()) return ACTION.hit
  }
}
