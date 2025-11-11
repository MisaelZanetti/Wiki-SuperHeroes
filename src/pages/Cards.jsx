import React from 'react'
import { useOutletContext } from 'react-router-dom'

export default function Cards() {
  const hola = useOutletContext();
  return (
    <div>
      <h1>{hola}</h1>
    </div>
  )
}
