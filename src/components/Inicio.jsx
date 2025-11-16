import { createContext, useState } from 'react'
import "./index.css"

function App() {

  return (
    <>
      <h1>WikiHeroes al cubo</h1>
      <section>
        <h2>Acerca de esta Wiki</h2>
        <p>
          Bienvenido a WikiHeroes, un proyecto pensado para organizar ideas, información y contenido
          de distintos heroes de manera y accesible. Aquí podrás explorar
          conceptos y conocer más a tus heroes favoritos.
        </p>
      </section>


      <section>
        <h2>¿Qué puedes encontrar aquí?</h2>
        <p>
          Esta wiki reúne textos simples sobre diferentes superheroes, con el objetivo de
          facilitar las busqueda de información. También podes ver sus estadisticas ya sea fuerza, inteligencia, velocidad, etc.
        </p>


        <ul>
          <li><strong>Heroés:</strong> Información sobre los heroes.</li>
          <li><strong>Favoritos:</strong> Los que vos seleccionaste como tus favoritos.</li>
          <li><strong>Peleas:</strong> Peleas entre dos heroes favoritos.</li>
        </ul>
      </section>


      <section>
        <h2>Objetivo del proyecto</h2>
        <p>
          El propósito de esta wiki es construir un espacio simple donde puedas ver y hacer pelaear a superheroes, aprender sobre nuevos temas o simplemente explorar contenido de forma clara.
        </p>
      </section>


      <section>
        <h2>Contacto</h2>
        <p>
          Si deseas aportar contenido o sugerencias, puedes agregar tus notas directamente en los
          próximos apartados o ampliar cualquiera de los temas ya presentes.
        </p>
      </section>
    </>
  )
}

export default App
