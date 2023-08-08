export default class Card {
  constructor(color, type) {
    this.imageUrl = `../cards/${color}_${type}.svg`
    this.color = color
    this.type = type
    this.value = this.deriveValue(type)
  }

  deriveValue(type) {
    let value = 0
    if (isNaN(type)) {
      if (type === "ace") {
        value = 11
      } else {
        value = 10
      }
    } else {
      value = type
    }
    return value
  }
}
