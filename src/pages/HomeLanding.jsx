import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export default function HomeLanding() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated") === "true";
    const email = localStorage.getItem("userEmail") || "";
    setIsAuthenticated(auth);
    setUserEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="hero">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">TeamUp.cl</div>

        <nav
          className="nav-buttons"
          style={{ display: "flex", alignItems: "center", gap: "12px" }}
        >
          {isAuthenticated ? (
            <>
              <span
                style={{
                  color: "#ffb6c1",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                👤 {userEmail}
              </span>
              <Link to="/perfil" className="btn-outline">Ver Perfil</Link>
              <button
                onClick={handleLogout}
                className="btn-outline"
                style={{ borderColor: "red", color: "red" }}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline">Iniciar Sesión</Link>
              <Link to="/register" className="btn-outline">Registrarse</Link>
            </>
          )}
        </nav>
      </header>

      {/* HERO CONTENT */}
      <main className="hero-content">
        <h1 className="hero-title">
          ¡Bienvenido a <span>TeamUp.cl</span>!
        </h1>
        <p className="hero-subtitle">
          Encuentra y reserva canchas de <strong>fútbol,</strong> de forma rápida y sencilla.<br />
          Únete a partidos o crea el tuyo. ¡Todo en un solo lugar!
        </p>

        <div className="hero-buttons">
          <Link to="/reservar" className="btn-primary">Reservar Cancha</Link>
          <Link to="/buscar" className="btn-secondary">Buscar Partido</Link>
        </div>

        <div className="hero-extra">
          <p>¿Eres dueño de una cancha?</p>
          <Link to="/publicar" className="btn-green">Publica tu cancha aquí</Link>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="landing-footer">
        © {new Date().getFullYear()} TeamUp.cl — Hecho con pasión por el deporte.
      </footer>
    </div>
  );
}
