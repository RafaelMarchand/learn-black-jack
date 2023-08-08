const STATES_HAND = {
  valid: 1,
  twentyOne: 2,
  busted: 3,
  blackJack: 4
}

export default class Hand {
  constructor(bet, cards, isPlayer = true) {
    this.cards = []
    this.bet = bet
    this.isPlayer = isPlayer
    this.soft = false
    this.state = STATES_HAND.valid

    cards.forEach((card) => this.hit(card))
  }

  hit(card) {
    this.cards.push(card)
    if (card.value === 11) this.soft = true
  }

  split() {
    return [this.bet, this.cards.pop()]
  }

  splittable() {
    return this.cards.length === 2 && this.cards[0].type === this.cards[1].type
  }

  double(card) {
    this.hit(card)
    this.bet += this.bet
  }

  doubleAllowed() {
    return this.cards.length == 2
  }

  hittable() {
    this.value()
    return this.state === STATES_HAND.valid
  }

  dealerDoneHitting() {
    let minDealerValue = 17
    if (this.soft) {
      minDealerValue = 18
    }
    return this.value() >= minDealerValue
  }

  value() {
    const validSums = this.cards.reduce((sums, card) => {
      if (sums.length === 0) {
        if (card.value === 11) {
          return [1, 11]
        }
        return [card.value]
      }
      if (card.value === 11) {
        return [1, 11].reduce((acc, valueAce) => {
          return [...acc, ...sums.map((sum) => sum + valueAce)]
        }, [])
      }
      return sums.map((sum) => sum + card.value)
    }, [])
    const validSumsSorted = validSums.sort((a, b) => b - a)
    const value = validSumsSorted.reduce((currentValue, value) => {
      if (currentValue > 21 && currentValue > value) return value
      return currentValue
    }, validSumsSorted[0])

    this.setState(value)
    return value
  }

  result(dealerHand) {
    if (this.state === STATES_HAND.busted) return -this.bet
    if (
      dealerHand.state === STATES_HAND.busted ||
      dealerHand.value() < this.value()
    ) {
      return this.bet
    }
    if (dealerHand.value() > this.value()) {
      return -this.bet
    }
    return 0
  }

  setState(value) {
    if (value > 21) this.state = STATES_HAND.busted
    if (value === 21 && this.cards.length === 2)
      this.state = STATES_HAND.blackJack
    if (value === 21) this.state = STATES_HAND.twentyOne
    if (value < 21) this.state = STATES_HAND.valid
  }
}
