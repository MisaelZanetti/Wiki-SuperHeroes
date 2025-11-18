import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./Principal";
import { useNavigate } from "react-router-dom";
import "../css/Favoritos.css";

export default function Favoritos() {
    const [prefUser] = useContext(UserContext);
    const [heroesFav, setHeroesFav] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setHeroesFav([]);

        prefUser.forEach(id => {
            fetch(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${id}.json`)
                .then(res => res.json())
                .then(data => {
                    setHeroesFav(prev => {
                        if (prev.some(h => h.id === data.id)) return prev;
                        return [...prev, data];
                    });
                });
        });
    }, [prefUser]);

    console.log(heroesFav, prefUser)

    return (
        <div className="cards-container">
            {heroesFav.map(hero => (
                <div
                    key={hero.id}
                    className="hero-card"
                    onClick={() => navigate(`/superheroes/${hero.id}`)}
                >
                    <div className="hero-img-container">
                        <img src={hero.images.md} alt={hero.name} className="hero-img" />
                    </div>

                    <div className="hero-info">
                        <div>
                            <h2 className="hero-name">{hero.name}</h2>
                            <p className="hero-race">{hero.appearance.race || "Unknown race"}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}