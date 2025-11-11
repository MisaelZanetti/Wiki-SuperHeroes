import React from 'react'
import { useOutletContext } from 'react-router-dom'

export default function Cards({}) {
  const heroesShow = useOutletContext();

  console.log(heroesShow)

  return (
    <div>
      {heroesShow.map(hero => (
        <div key={hero.id}>
          <img src={hero.images.sm} alt={hero.name}/>
          <h2>{hero.name}</h2>
        </div>
      ))}
    </div>
  );
}
