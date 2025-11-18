import "../css/Inicio.css";

function App() {
  return (
    <div className="app-container">

      <h1 className="app-title">WikiHeroes al cubo</h1>

      <div className="app-banner">
        <p>
          ⚡ Explora más de <strong>700 superhéroes</strong>, descubre sus poderes y guardá tus favoritos.
        </p>
      </div>

      <section className="app-section">
        <h2>Acerca de esta Wiki</h2>
        <p>
          Bienvenido a WikiHeroes, un proyecto pensado para organizar ideas, información y contenido
          de distintos héroes de manera accesible. Aquí podrás explorar conceptos y conocer más a tus héroes favoritos.
        </p>
      </section>

      <section className="app-section">
        <h2>¿Qué puedes encontrar aquí?</h2>
        <p>
          Esta wiki reúne textos simples sobre diferentes superhéroes, con el objetivo de
          facilitar la búsqueda de información. También podés ver sus estadísticas:
          fuerza, inteligencia, velocidad, etc.
        </p>

        <ul>
          <li><strong>Héroes:</strong> Información sobre los héroes.</li>
          <li><strong>Favoritos:</strong> Los que seleccionaste como favoritos.</li>
          <li><strong>Peleas:</strong> Batallas entre dos héroes favoritos.</li>
        </ul>
      </section>

      <section className="app-section">
        <h2>Objetivo del proyecto</h2>
        <p>
          El propósito de esta wiki es construir un espacio simple donde puedas ver y hacer pelear superhéroes,
          aprender sobre nuevos personajes o simplemente explorar contenido de forma clara.
        </p>
      </section>

      <section className="app-section">
        <h2>Contacto</h2>
        <p>
          Si deseas aportar contenido o sugerencias, puedes agregar tus notas directamente en los
          próximos apartados o ampliar cualquiera de los temas ya presentes.
        </p>
      </section>

    </div>
  );
}

export default App;
