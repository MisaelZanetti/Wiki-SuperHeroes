import { createContext, useState } from 'react'
import "./Inicio.css"

function App() {

  return (
    <>
      <h1>WikiHeroes al cubo</h1>
      <section>
        <h2>Acerca de esta Wiki</h2>
        <p>
          Bienvenido a MiWiki, un proyecto pensado para organizar ideas, información y contenido
          de distintos temas de manera clara y accesible. Aquí podrás leer artículos, explorar
          conceptos y conocer proyectos desarrollados por la comunidad.
        </p>
      </section>


      <section>
        <h2>¿Qué puedes encontrar aquí?</h2>
        <p>
          Esta wiki reúne textos simples sobre diferentes áreas de interés, con el objetivo de
          facilitar la lectura y la comprensión. No hay botones, funciones ni elementos interactivos;
          sólo contenido directo y organizado.
        </p>


        <ul>
          <li><strong>Información general:</strong> conceptos básicos y explicaciones.</li>
          <li><strong>Temas creativos:</strong> historias, ideas y proyectos personales.</li>
          <li><strong>Notas y reflexiones:</strong> textos breves sobre temas variados.</li>
        </ul>
      </section>


      <section>
        <h2>Objetivo del proyecto</h2>
        <p>
          El propósito de esta wiki es construir un espacio simple donde puedas almacenar tus
          ideas, aprender sobre nuevos temas o simplemente explorar contenido escrito de forma clara.
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
