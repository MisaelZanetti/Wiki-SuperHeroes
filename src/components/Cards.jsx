import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import "./Card.css";
import Footer from "./Footer";

export default function Cards() {
  const heroesShow = useOutletContext();
  const navigate = useNavigate();

  return (
    <div className="cards-container">
      {heroesShow.map((hero) => (
        <div
          key={hero.id}
          className="hero-card"
          onClick={() => navigate(`/superheroes/${hero.id}`)}
        >
          <div className="hero-img-container">
            <img src={hero.images.md} alt={hero.name} className="hero-img" />
          </div>
          <div className="hero-info">
            <h2 className="hero-name">{hero.name}</h2>
            <p className="hero-race">{hero.appearance.race || "Unknown race"}</p>
          </div>
        </div>
      ))
      }
    </div >
  );
}
