import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Ranking.css";

export default function Ranking() {
    const [heroes, setHeroes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json')
            .then(response => response.json())
            .then(data => {
                // Calcular poder promedio para cada héroe
                const heroesConPromedio = data.map(hero => {
                    const stats = Object.values(hero.powerstats);
                    const suma = stats.reduce((acc, val) => acc + parseInt(val || 0), 0);
                    const promedio = suma / stats.length;
                    
                    return {
                        ...hero,
                        promedioStats: promedio
                    };
                });

                // Ordenar de mayor a menor
                const ordenados = heroesConPromedio.sort((a, b) => b.promedioStats - a.promedioStats);
                
                // Tomar solo el top 50
                setHeroes(ordenados.slice(0, 50));
                setLoading(false);
            });
    }, []);

    const getMedalEmoji = (index) => {
        if (index === 0) return "🥇";
        if (index === 1) return "🥈";
        if (index === 2) return "🥉";
        return `#${index + 1}`;
    };

    const getBarColor = (promedio) => {
        if (promedio >= 90) return "#ff2e6f";
        if (promedio >= 75) return "#ff4d8b";
        if (promedio >= 60) return "#ff7ab0";
        if (promedio >= 45) return "#00d4a6";
        return "#32ffd1";
    };

    if (loading) {
        return (
            <div className="ranking-loading">
                <div className="loading-spinner"></div>
                <p>Calculando rankings...</p>
            </div>
        );
    }

    return (
        <div className="ranking-container">
            <div className="ranking-header">
                <h1 className="ranking-title">🏆 Ranking de Superhéroes</h1>
                <p className="ranking-subtitle">
                    Top 50 héroes clasificados por poder promedio
                </p>
            </div>

            <div className="ranking-list">
                {heroes.map((hero, index) => (
                    <div 
                        key={hero.id} 
                        className={`ranking-card rank-${index < 3 ? 'top' : 'normal'}`}
                        onClick={() => navigate(`/superheroes/${hero.id}`)}
                    >
                        <div className="rank-position">
                            <span className="rank-number">{getMedalEmoji(index)}</span>
                        </div>

                        <div className="rank-image">
                            <img src={hero.images.sm} alt={hero.name} />
                        </div>

                        <div className="rank-info">
                            <h3 className="rank-name">{hero.name}</h3>
                            <p className="rank-race">{hero.appearance.race || "Unknown"}</p>
                            
                            <div className="rank-stats-mini">
                                <div className="stat-mini">
                                    <span className="stat-mini-label">INT</span>
                                    <span className="stat-mini-value">{hero.powerstats.intelligence}</span>
                                </div>
                                <div className="stat-mini">
                                    <span className="stat-mini-label">STR</span>
                                    <span className="stat-mini-value">{hero.powerstats.strength}</span>
                                </div>
                                <div className="stat-mini">
                                    <span className="stat-mini-label">SPD</span>
                                    <span className="stat-mini-value">{hero.powerstats.speed}</span>
                                </div>
                                <div className="stat-mini">
                                    <span className="stat-mini-label">DUR</span>
                                    <span className="stat-mini-value">{hero.powerstats.durability}</span>
                                </div>
                                <div className="stat-mini">
                                    <span className="stat-mini-label">PWR</span>
                                    <span className="stat-mini-value">{hero.powerstats.power}</span>
                                </div>
                                <div className="stat-mini">
                                    <span className="stat-mini-label">CMB</span>
                                    <span className="stat-mini-value">{hero.powerstats.combat}</span>
                                </div>
                            </div>
                        </div>

                        <div className="rank-score">
                            <div className="score-number">{hero.promedioStats.toFixed(1)}</div>
                            <div className="score-label">Promedio</div>
                            
                            <div className="score-bar-container">
                                <div 
                                    className="score-bar-fill" 
                                    style={{ 
                                        width: `${hero.promedioStats}%`,
                                        background: getBarColor(hero.promedioStats)
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}