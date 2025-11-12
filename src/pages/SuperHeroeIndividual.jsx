import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './SuperHeroeIndividual.css'

export default function SuperHeroeIndividual() {
  const { id } = useParams();
  const [hero, setHero] = useState(null);

  useEffect(() => {
    fetch(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${id}.json`)
      .then(res => res.json())
      .then(data => setHero(data));
  }, [id]);

  if (!hero) return <div className="loading">Loading...</div>;

  const { images, name, biography, appearance, powerstats, connections, work } = hero;

  return (
    <div className="hero-container">
      <div className="hero-header">
        <img src={images.lg} alt={name} className="hero-image" />
        <div className="hero-info">
          <h1>{name}</h1>
          <h3>{biography.fullName}</h3>
          <p><strong>Primera presentación:</strong> {biography.firstAppearance}</p>
          <p><strong>Lugar de nacimiento:</strong> {biography.placeOfBirth}</p>
          <p><strong>Ocupación:</strong> {work.occupation}</p>
        </div>
      </div>

      <div className="powerstats">
        <h2>Estadísticas de poder</h2>
        {Object.entries(powerstats).map(([key, value]) => (
          <div key={key} className="stat">
            <span>{key.toUpperCase()}</span>
            <div className="bar">
              <div className="fill" style={{ width: `${value}%` }}></div>
            </div>
            <span className="value">{value}</span>
          </div>
        ))}
      </div>

      <div className="details">
        <div className="section">
          <h2>Apariencia</h2>
          <p><strong>Género:</strong> {appearance.gender}</p>
          <p><strong>Carrera:</strong> {appearance.race}</p>
          <p><strong>Altura:</strong> {appearance.height.join(" / ")}</p>
          <p><strong>Peso:</strong> {appearance.weight.join(" / ")}</p>
          <p><strong>Color de pelo:</strong> {appearance.hairColor}</p>
          <p><strong>Color de ojos:</strong> {appearance.eyeColor}</p>
        </div>

        <div className="section">
          <h2>Conexiones</h2>
          <p><strong>Afiliación a grupo:</strong> {connections.groupAffiliation}</p>
          <p><strong>Parientes:</strong> {connections.relatives}</p>
        </div>

        <div className="section">
          <h2>Base de Trabajo</h2>
          <p><strong>Base:</strong> {work.base}</p>
        </div>
      </div>
    </div>
  );
}