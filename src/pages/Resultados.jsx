import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Resultados() {
  const navigate = useNavigate();

  // Datos simulados de partidos/canchas
  const resultadosSimulados = [
    {
      nombre: "Cancha Central",
      direccion: "Calle Falsa 123",
      fecha: "2025-09-10",
      hora: "19:00",
    },
    {
      nombre: "Cancha Norte",
      direccion: "Avenida Siempre Viva 456",
      fecha: "2025-09-10",
      hora: "20:00",
    },
  ];

  return (
    <div
      className="login-hero"
      style={{
        backgroundImage: "url('https://static.independentespanol.com/2024/02/22/04/MLS-RESUMEN_56820.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center 20%",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div className="login-overlay"></div>

      {/* Botón Home */}
      <button className="home-button" onClick={() => navigate("/")}>
        🏠
      </button>

      <div className="login-card" style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "12px" }}>Resultados</h2>

        {resultadosSimulados.length === 0 ? (
          <p style={{ textAlign: "center" }}>No hay partidos disponibles</p>
        ) : (
          resultadosSimulados.map((res, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ff69b4",
                borderRadius: "6px",
                padding: "8px",
                marginBottom: "10px",
                background: "rgba(0,0,0,0.6)",
                color: "#fff",
              }}
            >
              <h4 style={{ margin: "4px 0" }}>{res.nombre}</h4>
              <p style={{ margin: "2px 0", fontSize: "0.85rem" }}>Dirección: {res.direccion}</p>
              <p style={{ margin: "2px 0", fontSize: "0.85rem" }}>Fecha: {res.fecha}</p>
              <p style={{ margin: "2px 0", fontSize: "0.85rem" }}>Hora: {res.hora}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
