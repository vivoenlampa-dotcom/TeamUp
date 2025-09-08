import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function ReservarCancha() {
  const navigate = useNavigate();

  return (
    <div
      className="login-hero"
      style={{
        backgroundImage: "url('https://wallpapers.com/images/hd/messi-in-inter-miami-pink-jersey-0nrcompkhks77o6u.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div className="login-overlay"></div>

      {/* Botón Home */}
      <button className="home-button" onClick={() => navigate("/")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#ff69b4"
          viewBox="0 0 24 24"
          width="32px"
          height="32px"
        >
          <path d="M12 3l10 9h-3v9h-6v-6h-2v6H5v-9H2z" />
        </svg>
      </button>

      <div className="login-card">
        <h1 className="hero-title">Reservar Cancha</h1>
        <p style={{ marginBottom: "20px" }}>Aquí podrás seleccionar la cancha que quieres reservar.</p>
        <form className="login-form">
          <input type="text" placeholder="Nombre de la cancha" />
          <input type="date" placeholder="Fecha" />
          <input type="time" placeholder="Hora" />
          <button className="btn-primary" type="submit">Reservar</button>
        </form>
      </div>
    </div>
  );
}
