import { useState, useEffect, useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Cards from "./Cards";
import Footer from "./Footer";
import { UserContext } from "./Principal";
import "../css/Superheroes.css";


export default function Superheroes() {
    const [heroes, setHeroes] = useState([]);
    const [heroesShow, setHeroesShow] = useState([]);
    const [page, setPage] = useState(0);
    const [prefUser, setPrefUser] = useContext(UserContext);
    const location = useLocation();
    const [sortBy, setSortBy] = useState("none");
    const [sortOrder, setSortOrder] = useState("asc");

    const isAllHeroesRoute = location.pathname === '/superheroes/all';

    useEffect(() => {
        fetch('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json')
            .then(response => response.json())
            .then(data => setHeroes(data));
    }, []);

    useEffect(() => {
        let sortedHeroes = [...heroes];

        // Aplicar ordenamiento
        if (sortBy !== "none") {
            sortedHeroes.sort((a, b) => {
                let valueA, valueB;

                if (sortBy === "name") {
                    valueA = a.name.toLowerCase();
                    valueB = b.name.toLowerCase();
                    return sortOrder === "asc" 
                        ? valueA.localeCompare(valueB)
                        : valueB.localeCompare(valueA);
                } else {
                    // Ordenar por powerstats
                    valueA = parseInt(a.powerstats[sortBy] || 0);
                    valueB = parseInt(b.powerstats[sortBy] || 0);
                    return sortOrder === "asc" 
                        ? valueA - valueB
                        : valueB - valueA;
                }
            });
        }

        const inicio = page * 20;
        const fin = inicio + 20;
        setHeroesShow(sortedHeroes.slice(inicio, fin));
    }, [heroes, page, sortBy, sortOrder]);

    const nextPage = () => {
        if ((page + 1) * 20 < heroes.length) {
            setPage(page + 1);
        }
    };

    const prevPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const getPageNumbers = () => {
        const totalPages = Math.ceil(heroes.length / 20);
        const numbers = [];

        for (let i = page - 2; i <= page + 2; i++) {
            if (i >= 0 && i < totalPages) {
                numbers.push(i);
            }
        }

        return numbers;
    };

    const handleSortChange = (newSortBy) => {
        if (sortBy === newSortBy) {
            // Si es el mismo criterio, cambiar el orden
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            // Nuevo criterio, empezar en ascendente
            setSortBy(newSortBy);
            setSortOrder("asc");
        }
        setPage(0); // Resetear a la primera página
    };


    return (
        <>
            <div className="superheroes-page">
                <div className="header">
                    <h1 className="title">Superhéroes</h1>
                    <div className="links">
                        <Link className="link" to={'/inicio'}>Inicio</Link>
                        <Link className="link" to={"/superheroes/all"}>Héroes</Link>
                        <Link className="link" to={'/superheroes/busqueda'}>Buscar</Link>
                        <Link className="link" to={'/superheroes/favoritos'}>Favoritos</Link>
                        <Link className="link" to={'/superheroes/batalla'}>Batalla</Link>
                        <Link className="link" to={'/superheroes/ranking'}>Ranking</Link>
                    </div>
                </div>

                {isAllHeroesRoute && (
                    <div className="filters-container">
                        <div className="filters-header">
                            <h3>Ordenar por:</h3>
                        </div>
                        <div className="filters-buttons">
                            <button
                                className={`filter-btn ${sortBy === "none" ? "active" : ""}`}
                                onClick={() => {
                                    setSortBy("none");
                                    setPage(0);
                                }}
                            >
                                Sin orden
                            </button>
                            <button
                                className={`filter-btn ${sortBy === "name" ? "active" : ""}`}
                                onClick={() => handleSortChange("name")}
                            >
                                Nombre {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                            </button>
                            <button
                                className={`filter-btn ${sortBy === "intelligence" ? "active" : ""}`}
                                onClick={() => handleSortChange("intelligence")}
                            >
                                Inteligencia {sortBy === "intelligence" && (sortOrder === "asc" ? "↑" : "↓")}
                            </button>
                            <button
                                className={`filter-btn ${sortBy === "strength" ? "active" : ""}`}
                                onClick={() => handleSortChange("strength")}
                            >
                                Fuerza {sortBy === "strength" && (sortOrder === "asc" ? "↑" : "↓")}
                            </button>
                            <button
                                className={`filter-btn ${sortBy === "speed" ? "active" : ""}`}
                                onClick={() => handleSortChange("speed")}
                            >
                                Velocidad {sortBy === "speed" && (sortOrder === "asc" ? "↑" : "↓")}
                            </button>
                            <button
                                className={`filter-btn ${sortBy === "durability" ? "active" : ""}`}
                                onClick={() => handleSortChange("durability")}
                            >
                                Durabilidad {sortBy === "durability" && (sortOrder === "asc" ? "↑" : "↓")}
                            </button>
                            <button
                                className={`filter-btn ${sortBy === "power" ? "active" : ""}`}
                                onClick={() => handleSortChange("power")}
                            >
                                Poder {sortBy === "power" && (sortOrder === "asc" ? "↑" : "↓")}
                            </button>
                            <button
                                className={`filter-btn ${sortBy === "combat" ? "active" : ""}`}
                                onClick={() => handleSortChange("combat")}
                            >
                                Combate {sortBy === "combat" && (sortOrder === "asc" ? "↑" : "↓")}
                            </button>
                        </div>
                    </div>
                )}

                <div className="cards-container">
                    <Outlet context={heroesShow} />
                </div>

                {/* Solo mostrar paginación si estamos en /superheroes/all */}
                {isAllHeroesRoute && (
                    <>
                        <div className="pagination">
                            <button
                                onClick={() => setPage(0)}
                                disabled={page === 0}
                                className="arrow"
                            >
                                {"<<"}
                            </button>

                            <button
                                onClick={prevPage}
                                disabled={page === 0}
                                className="arrow"
                            >
                                {"<"}
                            </button>

                            {getPageNumbers().map(num => (
                                <button
                                    key={num}
                                    onClick={() => setPage(num)}
                                    className={num === page ? "active-page" : ""}
                                >
                                    {num + 1}
                                </button>
                            ))}

                            <button
                                onClick={nextPage}
                                disabled={(page + 1) * 20 >= heroes.length}
                                className="arrow"
                            >
                                {">"}
                            </button>

                            <button
                                onClick={() => setPage(Math.ceil(heroes.length / 20) - 1)}
                                disabled={(page + 1) * 20 >= heroes.length}
                                className="arrow"
                            >
                                {">>"}
                            </button>
                        </div>

                        <div className="pagination">
                            <button onClick={prevPage}>←</button>
                            <button onClick={nextPage}>→</button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}