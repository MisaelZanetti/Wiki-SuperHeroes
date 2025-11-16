import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import "../css/Cards.css";

export default function Cards() {
  const heroesShow = useOutletContext();
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (id) => {
    setSelectedId(id);
    navigate(`/superheroes/${id}`);
  };

  return (
    <div className="cards-container">
      {heroesShow.map((hero) => (
        <div
          key={hero.id}
          className={`hero-card ${selectedId === hero.id ? "selected" : ""}`}
          onClick={() => handleSelect(hero.id)}
        >
          <div className="hero-img-container">
            <img src={hero.images.md} alt={hero.name} className="hero-img" />
          </div>
          <div className="hero-info">
            <h2 className="hero-name">{hero.name}</h2>
            <p className="hero-race">{hero.appearance.race || "Unknown race"}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
