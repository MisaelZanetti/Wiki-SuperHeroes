import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer
            style={{
                background: "#0b1226",
                color: "#f1f1f1",
                textAlign: "center",
                padding: "2rem 1rem",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                marginTop: '20px',
            }}
        >
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
                <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "#ff4757" }}>
                    Wiki Superheroes
                </h2>

                <p style={{ margin: "0.3rem 0", fontSize: "0.95rem" }}>
                    Explora el universo de héroes, poderes y orígenes.
                </p>

                <div
                    style={{
                        marginTop: "1rem",
                        display: "flex",
                        justifyContent: "center",
                        gap: "1.2rem",
                        flexWrap: "wrap",
                    }}
                >
                    <Link to={'/'}>
                        Inicio
                    </Link>
                    <Link to={"/superheroes/all"}>
                        Héroes
                    </Link>
                    <Link to={'/figths'}>
                        Pelea
                    </Link>
                    <Link to={'/busqueda'}>
                        Buscar
                    </Link>
                </div>
            </div>
        </footer>
    );
}
