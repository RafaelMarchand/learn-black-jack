import Hand from "./Hand"
import { ACTION } from "./BlackJack"

export default class Player {
  constructor(name, balance) {
    this.name = name
    this.balance = balance
    this.hands = []
    this.currentHand = 0
    this.isRoundOver = false
  }

  getHand() {
    return this.hands[this.currentHand]
  }

  clear() {
    let cards = []
    this.hands.forEach((hand) => {
      cards = [...cards, ...hand.cards]
    })
    this.hands = []
    return cards
  }

  action(action, getRandomCard) {
    switch (action) {
      case ACTION.hit:
        this.hit(getRandomCard())
        break
      case ACTION.split:
        this.split(getRandomCard(), getRandomCard())
        break
      case ACTION.stand:
        this.stand()
        break
      case ACTION.double:
        this.double(getRandomCard())
        break
    }
  }

  nextHand() {
    if (this.currentHand < this.hands.length - 1) {
      this.currentHand++
    } else {
      this.isRoundOver = true
    }
  }

  calculateBalance(dealerHand) {
    this.hands.forEach((hand) => {
      this.balance += hand.result(dealerHand)
    })
  }

  deal(bet, cards) {
    this.hands.push(new Hand(bet, cards))
  }

  hit(card) {
    this.hands[this.currentHand].hit(card)
    if (!this.getHand().hittable()) {
      this.nextHand()
    }
  }

  split(card1, card2) {
    if (!this.getHand().splittable()) return
    const [bet, card] = this.getHand().split()
    this.getHand().hit(card1)
    this.hands.push(new Hand(bet, [card, card2]))
  }

  stand() {
    this.nextHand()
  }

  double(card) {
    if (!this.getHand().doubleAllowed()) return
    this.getHand().double(card)
    this.nextHand()
  }
}
