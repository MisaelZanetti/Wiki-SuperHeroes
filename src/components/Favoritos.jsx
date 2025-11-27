import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./Principal";
import { useNavigate } from "react-router-dom";
import BotonFav from "./BotonFav";
import "../css/Favoritos.css";

export default function Favoritos() {
    const [prefUser] = useContext(UserContext);
    const [heroesFav, setHeroesFav] = useState([]);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setCargando(true);
        setHeroesFav([]);

        if (prefUser.length === 0) {
            setCargando(false);
            return;
        }

        // Cargar todos los héroes favoritos
        Promise.all(
            prefUser.map(id =>
                fetch(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${id}.json`)
                    .then(res => res.json())
            )
        )
        .then(heroes => {
            setHeroesFav(heroes);
            setCargando(false);
        })
        .catch(err => {
            console.error("Error cargando favoritos:", err);
            setCargando(false);
        });
    }, [prefUser]);

    if (cargando) {
        return (
            <div className="favorites-empty">
                <p>Cargando favoritos...</p>
            </div>
        );
    }

    if (heroesFav.length === 0) {
        return (
            <div className="favorites-empty">
                <p>No tienes héroes favoritos aún. ¡Explora y agrega algunos! ⭐</p>
            </div>
        );
    }

    return (
        <div className="cards-container">
            {heroesFav.map(hero => (
                <div
                    key={hero.id}
                    className="hero-card"
                >
                    <div 
                        className="hero-img-container"
                        onClick={() => navigate(`/superheroes/${hero.id}`)}
                    >
                        <img src={hero.images.md} alt={hero.name} className="hero-img" />
                    </div>

                    <div className="hero-info">
                        <div onClick={() => navigate(`/superheroes/${hero.id}`)}>
                            <h2 className="hero-name">{hero.name}</h2>
                            <p className="hero-race">{hero.appearance.race || "Unknown race"}</p>
                        </div>
                        <BotonFav id={hero.id} />
                    </div>
                </div>
            ))}
        </div>
    );
}