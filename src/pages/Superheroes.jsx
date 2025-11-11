import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Cards from "./Cards";

export default function Superheroes() {
    const [heroes, setHeroes] = useState([]);
    const [heroesShow, setHeroesShow] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetch('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json')
            .then(response => response.json())
            .then(data => setHeroes(data));
    }, []);

    useEffect(() => {
        const start = page * 21;
        const end = start + 21;
        setHeroesShow(heroes.slice(start, end));
    }, [heroes, page]);

    const nextPage = () => {
        if ((page + 1) * 21 < heroes.length) {
            setPage(page + 1);
        }
    };

    const prevPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    return (
        <div>
            <h1>Superhéroes</h1>

            <Outlet context={heroesShow} />

            <div>
                <button onClick={prevPage} >←</button>
                <button onClick={nextPage} >→</button>
            </div>
        </div>
    );
}