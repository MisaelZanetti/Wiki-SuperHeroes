import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Busqueda() {
    const [valor, setValor] = useState("");
    const [heroes, setHeroes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json')
            .then(response => response.json())
            .then(data => setHeroes(data));
    }, []);

    const manejarCambio = (e) => {
        const texto = e.target.value;
        setValor(texto);
    };

    return (
        <section>
            <div className="cajaBusqueda">
                <input className="inputBusqueda"
                    type="text"
                    placeholder="Buscar superhéroe..."
                    value={valor}
                    onInput={manejarCambio}
                />
            </div>

            <div className="cards-container">
                {heroes.filter(hero => hero.name.toLowerCase().includes(valor.toLowerCase())).map((hero) => (
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
                ))}
            </div>
        </section>
    );
}
