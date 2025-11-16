import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./Principal";
import "../css/Battle.css";
export default function Battle() {
    const [prefUser] = useContext(UserContext);
    const [heroesFav, setHeroesFav] = useState([]);
    const [heroIzq, setHeroIzquierda] = useState(null);
    const [heroDerecha, setHeroDerecha] = useState(null);

    useEffect(() => {
        setHeroesFav([]);

        prefUser.forEach(id => {
            fetch(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${id}.json`)
                .then(res => res.json())
                .then(data => {
                    setHeroesFav(prev => {
                        // evitar duplicados:
                        if (prev.some(h => h.id === data.id)) return prev;
                        return [...prev, data];
                    });
                });
        });
    }, [prefUser]);

    return (
        <div className="battle-container">
            <div className="battle-side left-side">
                <h2 className="side-title">Héroe 1</h2>

                <select
                    className="hero-select"
                    onChange={(e) =>
                        setHeroIzquierda(heroesFav.find(h => h.id == e.target.value))
                    }
                >
                    <option value="">Seleccionar...</option>
                    {heroesFav.map(hero => (
                        <option key={hero.id} value={hero.id}>{hero.name}</option>
                    ))}
                </select>

                <div className="hero-photo">
                    {heroIzq && <img src={heroIzq.images.md} alt={heroIzq.name} />}
                </div>

                <div className="stats-container">
                    {heroIzq &&
                        Object.entries(heroIzq.powerstats).map(([stat, value]) => (
                            <div key={stat} className="stat-row">
                                <span className="stat-label">{stat.toUpperCase()}</span>
                                <div className="stat-bar">
                                    <div className="stat-fill" style={{ width: `${value}%` }}></div>
                                </div>
                                <span className="stat-value">{value}</span>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="battle-side right-side">
                <h2 className="side-title">Héroe 2</h2>

                <select
                    className="hero-select"
                    onChange={(e) =>
                        setHeroDerecha(heroesFav.find(h => h.id == e.target.value))
                    }
                >
                    <option value="">Seleccionar...</option>
                    {heroesFav.map(hero => (
                        <option key={hero.id} value={hero.id}>{hero.name}</option>
                    ))}
                </select>

                <div className="hero-photo">
                    {heroDerecha && <img src={heroDerecha.images.md} alt={heroDerecha.name} />}
                </div>

                <div className="stats-container">
                    {heroDerecha &&
                        Object.entries(heroDerecha.powerstats).map(([stat, value]) => (
                            <div key={stat} className="stat-row">
                                <span className="stat-label">{stat.toUpperCase()}</span>
                                <div className="stat-bar">
                                    <div className="stat-fill" style={{ width: `${value}%` }}></div>
                                </div>
                                <span className="stat-value">{value}</span>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="fight-button-container">
                <button
                    className="fight-btn"
                    disabled={!heroIzq || !heroDerecha}
                >
                    ¡Pelear!
                </button>
            </div>
        </div>
    );
}
