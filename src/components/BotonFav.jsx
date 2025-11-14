import React, { useContext } from 'react'
import { UserContext } from "./Inicio";

export default function BotonFav({ id }) {
    const [prefUser, setPrefUser] = useContext(UserContext)

    const hcf = () => {
        setPrefUser(prev => [...prev, id])
    }

    return (
        <div>
            <button className='btnFav' onClick={hcf}>☆</button>
        </div>
    )
}