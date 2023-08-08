import React from 'react'

export default function Card({card}) {
  return (
    <img src={card.imageUrl} width="100%" height={"100%"}></img>  
  )
}
