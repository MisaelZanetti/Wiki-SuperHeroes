import { useState, createContext, useEffect } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Cards from "./Cards";


export default function Superheroes() {
    const [heroes, setHeroes] = useState([]);
    const API_KEY = 'fc1ca0de91fdb4a7034e007fd91e99c9'
    useEffect(() => {
        fetch()
    }, [])

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Superhéroes</h1>

            <Outlet context={hola} />

            <nav className="flex gap-4 mb-4">
                <Link to="page/1">1</Link>
                <Link to="page/2">2</Link>
                <Link to="page/3">3</Link>
            </nav>
        </div>
    );
}