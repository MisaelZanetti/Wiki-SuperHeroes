import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from "./Principal";
import "../css/BotonFav.css";

export default function BotonFav({ id }) {
    const [prefUser, setPrefUser] = useContext(UserContext)
    const [esFavorito, setEsFavorito] = useState(false)

    useEffect(() => {
        const estáEnFavoritos = prefUser.includes(parseInt(id))
        setEsFavorito(estáEnFavoritos)
    }, [prefUser, id])

    const toggleFavorito = () => {
        const heroId = parseInt(id)
        
        if (esFavorito) {
            setPrefUser(prev => prev.filter(favId => favId !== heroId))
        } else {
            setPrefUser(prev => [...prev, heroId])
        }
    }

    return (
        <div>
            <button 
                className={`btnFav ${esFavorito ? 'active' : ''}`}
                onClick={toggleFavorito}
                title={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
                {esFavorito ? "★" : "☆"}
            </button>
        </div>
    )
}