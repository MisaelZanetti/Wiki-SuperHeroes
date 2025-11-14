import { useState, useEffect, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Cards from "./Cards";
import Footer from "./Footer";
import { UserContext } from "./Inicio";

export default function Superheroes() {
    const [heroes, setHeroes] = useState([]);
    const [heroesShow, setHeroesShow] = useState([]);
    const [page, setPage] = useState(0);
    const [prefUser, setPrefUser] = useContext(UserContext)

    useEffect(() => {
        fetch('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json')
            .then(response => response.json())
            .then(data => setHeroes(data));
    }, []);

    useEffect(() => {
        const start = page * 20;
        const end = start + 20;
        setHeroesShow(heroes.slice(start, end));
    }, [heroes, page]);

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

    return (
        <>
            <div className="superheroes-page">
                <div className="header">
                    <h1 className="title">Superhéroes</h1>
                    <div className="links">
                        <Link className="link" to={'/'}>Inicio</Link>
                        <Link className="link" to={"/superheroes/all"}>Héroes</Link>
                        <Link className="link" to={'/superheroes/busqueda'}>Buscar</Link>
                        <Link className="link" to={'/superheroes/favoritos'}>Favoritos</Link>
                        <Link className="link" to={'/figths'}>Pelea</Link>
                    </div>
                </div>

                <div className="cards-container">
                    <Outlet context={heroesShow} />
                </div>

                <div className="pagination">
                    <button onClick={prevPage}>←</button>
                    <button onClick={nextPage}>→</button>
                </div>
            </div>
        </>
    );
}