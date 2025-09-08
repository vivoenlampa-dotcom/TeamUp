import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function BuscarPartido() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    fecha: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusqueda(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías guardar los filtros en localStorage o context si quisieras usarlos en Resultados
    navigate("/resultados"); // Redirige a la página de resultados
  };

  return (
    <div
      className="login-hero"
      style={{
        backgroundImage: "url('https://assets.goal.com/images/v3/blte8158c229856001c/Lionel%20Messi%20GFX.jpg?auto=webp&format=pjpg&width=3840&quality=60')",
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
        <h1 className="hero-title">Buscar Partido</h1>
        <p style={{ marginBottom: "20px" }}>Encuentra partidos disponibles cerca de ti.</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ciudad o zona"
            name="ciudad"
            value={busqueda.ciudad}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="fecha"
            value={busqueda.fecha}
            onChange={handleChange}
            required
          />
          <button className="btn-primary" type="submit">
            Buscar
          </button>
        </form>
      </div>
    </div>
  );
}
