import React, { useContext, useState } from 'react'
import { UserContext } from "./Principal";
import "../css/BotonFav.css";

export default function BotonFav({ id }) {
    const [prefUser, setPrefUser] = useContext(UserContext)
    const [estrella, setEstrella] = useState("☆")
    const [fav, setFav] = useState(true)

    const hcf = () => {
        setFav(!fav)
        setPrefUser(prev => [...prev, id])
        fav? setEstrella("★") : setEstrella ("☆");
    }

    return (
        <div>
            <button className='btnFav' onClick={hcf}>{estrella}</button>
        </div>
    )
}