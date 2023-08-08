import React from 'react'
import Card from './Card'


export default function HandDealer({hand}) {
  return (
    <div style={{display: "flex", flexDirection: "column"}}>
  
      {hand.isPlayer && 
      <div style={{width: "15em", height: "2em", textAlign: "center", verticalAlign: "middle"}}>{hand.bet}</div>}

      <div style={{position: "relative", height: "23em", width: "15em"}}> 
      {hand.cards && hand.cards.map((card, index) => {
        let position = index  * 17
        return (
          <div key={card.imageUrl} style={{ position: "absolute",
                        top: "0",
                        left: `${position}%`,
                        width: "100%",
                        height: "100%"}}>
            <Card card={card}/>
          </div>
        )
      })}
    </div>
    </div>
  )
}
