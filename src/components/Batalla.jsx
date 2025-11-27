import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./Principal";
import "../css/Battle.css";

export default function Battle() {
    const [prefUser] = useContext(UserContext);
    const [heroesFav, setHeroesFav] = useState([]);
    const [heroIzq, setHeroIzquierda] = useState(null);
    const [heroDerecha, setHeroDerecha] = useState(null);
    const [battleMode, setBattleMode] = useState("total"); // "total" o "individual"

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

    const calcularPowerTotal = (hero) => {
        return Object.values(hero.powerstats).reduce((sum, val) => sum + parseInt(val || 0), 0);
    };

    const battleTotal = () => {
        const powerIzq = calcularPowerTotal(heroIzq);
        const powerDer = calcularPowerTotal(heroDerecha);

        let resultado = "";
        let ganador = "";

        if (powerIzq > powerDer) {
            ganador = heroIzq.name;
            resultado = `
                <div style="text-align: center;">
                    <h3 style="color: #000000;">🏆 ¡${heroIzq.name} gana!</h3>
                    <p><strong>${heroIzq.name}:</strong> ${powerIzq} puntos</p>
                    <p><strong>${heroDerecha.name}:</strong> ${powerDer} puntos</p>
                    <p style="margin-top: 15px; color: #666;">Diferencia: ${powerIzq - powerDer} puntos</p>
                </div>
            `;
        } else if (powerDer > powerIzq) {
            ganador = heroDerecha.name;
            resultado = `
                <div style="text-align: center;">
                    <h3 style="color: #000000;">🏆 ¡${heroDerecha.name} gana!</h3>
                    <p><strong>${heroDerecha.name}:</strong> ${powerDer} puntos</p>
                    <p><strong>${heroIzq.name}:</strong> ${powerIzq} puntos</p>
                    <p style="margin-top: 15px; color: #666;">Diferencia: ${powerDer - powerIzq} puntos</p>
                </div>
            `;
        } else {
            resultado = `
                <div style="text-align: center;">
                    <h3 style="color: #000000;">🤝 ¡Empate!</h3>
                    <p>Ambos héroes tienen <strong>${powerIzq}</strong> puntos totales</p>
                </div>
            `;
        }

        Swal.fire({
            title: "Resultado de la Batalla",
            html: resultado,
            icon: ganador ? "success" : "info",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3085d6"
        });
    };

    const battleIndividual = () => {
        const stats = Object.keys(heroIzq.powerstats);
        let victoriasIzq = 0;
        let victoriasDer = 0;

        let detalles = '<div style="text-align: left; max-width: 400px; margin: 0 auto;">';

        stats.forEach(stat => {
            const valIzq = parseInt(heroIzq.powerstats[stat] || 0);
            const valDer = parseInt(heroDerecha.powerstats[stat] || 0);

            let icono = "";
            if (valIzq > valDer) {
                victoriasIzq++;
                icono = "🔵";
            } else if (valDer > valIzq) {
                victoriasDer++;
                icono = "🔴";
            } else {
                icono = "⚪";
            }

            detalles += `
                <div style="margin: 8px 0; padding: 5px; background: #f5f5f5; border-radius: 5px;">
                    <strong>${stat.toUpperCase()}:</strong> 
                    ${heroIzq.name} (${valIzq}) vs ${heroDerecha.name} (${valDer}) ${icono}
                </div>
            `;
        });

        detalles += '</div>';

        let ganador = "";
        let titulo = "";

        if (victoriasIzq > victoriasDer) {
            ganador = heroIzq.name;
            titulo = `🏆 ¡${heroIzq.name} gana!`;
        } else if (victoriasDer > victoriasIzq) {
            ganador = heroDerecha.name;
            titulo = `🏆 ¡${heroDerecha.name} gana!`;
        } else {
            titulo = "🤝 ¡Empate!";
        }

        const resumen = `
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: #000000;">${titulo}</h3>
                <p><strong>${heroIzq.name}:</strong> ${victoriasIzq} victorias 🔵</p>
                <p><strong>${heroDerecha.name}:</strong> ${victoriasDer} victorias 🔴</p>
            </div>
        `;

        Swal.fire({
            title: "Resultado de la Batalla",
            html: resumen + detalles,
            icon: ganador ? "success" : "info",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3085d6",
            width: "600px"
        });
    };

    const handleBattle = () => {
        if (!heroIzq || !heroDerecha) return;

        if (heroIzq.id === heroDerecha.id) {
            Swal.fire({
                title: "Error",
                text: "¡No puedes hacer pelear a un héroe contra sí mismo!",
                icon: "error",
                confirmButtonText: "Aceptar"
            });
            return;
        }

        if (battleMode === "total") {
            battleTotal();
        } else {
            battleIndividual();
        }
    };

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
                <div className="battle-mode-selector">
                    <label>
                        Modo de Batalla:
                    </label>
                    <select
                        value={battleMode}
                        onChange={(e) => setBattleMode(e.target.value)}
                        style={{
                            padding: "8px 15px",
                            borderRadius: "5px",    
                            cursor: "pointer"
                        }}
                    >
                        <option value="total">Poder Total (Suma de todas las estadísticas)</option>
                        <option value="individual">Habilidad por Habilidad</option>
                    </select>
                </div>
                <button
                    className="fight-btn"
                    disabled={!heroIzq || !heroDerecha}
                    onClick={handleBattle}
                >
                    ¡Pelear!
                </button>
            </div>
        </div>
    );
}