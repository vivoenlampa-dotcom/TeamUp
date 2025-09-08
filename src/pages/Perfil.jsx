import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Perfil() {
  const navigate = useNavigate();
  const [footballProfile, setFootballProfile] = useState({
    imagen: null,
    edad: "",
    bio: "",
    posiciones: [],
    suscripcion: false,
    disponibilidad: {}, // <-- agregamos disponibilidad
  });

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const horas = ["19:00", "20:00", "21:00", "22:00", "23:00"];

  useEffect(() => {
    const perfilGuardado = localStorage.getItem("miPerfilFutbol");
    const initDisp = {};
    dias.forEach(d => {
      initDisp[d] = {};
      horas.forEach(h => initDisp[d][h] = false);
    });

    if (perfilGuardado) {
      const perfil = JSON.parse(perfilGuardado);
      if (!perfil.disponibilidad) perfil.disponibilidad = initDisp;
      setFootballProfile(perfil);
    } else {
      setFootballProfile(prev => ({ ...prev, disponibilidad: initDisp }));
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>
        setFootballProfile({ ...footballProfile, imagen: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const posiciones = [
    { id: "PT", label: "Portero" },
    { id: "LI", label: "Lateral Izquierdo" },
    { id: "CI", label: "Central Izquierdo" },
    { id: "CD", label: "Central Derecho" },
    { id: "LD", label: "Lateral Derecho" },
    { id: "MC", label: "Medio Centro" },
    { id: "EI", label: "Extremo Izquierdo" },
    { id: "ED", label: "Extremo Derecho" },
    { id: "DC", label: "Delantero Centro" },
  ];

  const handlePositionClick = (id) => {
    if (!footballProfile.suscripcion) return;
    const posIndex = footballProfile.posiciones.findIndex((p) => p.id === id);
    if (posIndex === -1) {
      setFootballProfile({
        ...footballProfile,
        posiciones: [...footballProfile.posiciones, { id, nivel: 1 }],
      });
    } else {
      const posicionesCopy = [...footballProfile.posiciones];
      let nextNivel = posicionesCopy[posIndex].nivel + 1;
      if (nextNivel > 3) nextNivel = 0;
      if (nextNivel === 0) posicionesCopy.splice(posIndex, 1);
      else posicionesCopy[posIndex].nivel = nextNivel;
      setFootballProfile({ ...footballProfile, posiciones: posicionesCopy });
    }
  };

  const getPositionStyle = (id) => {
    const pos = footballProfile.posiciones.find((p) => p.id === id);
    if (!pos) return { backgroundColor: "rgba(100,100,100,0.5)", boxShadow: "none" };
    if (pos.nivel === 1)
      return { backgroundColor: "#ff1493", boxShadow: "0 0 8px #ff1493, 0 0 14px rgba(255,20,147,0.6), 0 0 20px rgba(255,20,147,0.4)" };
    if (pos.nivel === 2)
      return { backgroundColor: "#ff69b4", boxShadow: "0 0 4px #ff69b4, 0 0 8px rgba(255,105,180,0.5), 0 0 12px rgba(255,105,180,0.3)" };
    return { backgroundColor: "rgba(100,100,100,0.5)", boxShadow: "none" };
  };

  const getPositionCoords = (id) => {
    switch (id) {
      case "PT": return { bottom: "0%", left: "50%", transform: "translateX(0%)" };
      case "LI": return { bottom: "26%", left: "10%" };
      case "CI": return { bottom: "14%", left: "35%" };
      case "CD": return { bottom: "14%", left: "65%" };
      case "LD": return { bottom: "26%", left: "88%" };
      case "MC": return { bottom: "43%", left: "50%", transform: "translateX(0%)" };
      case "EI": return { bottom: "67%", left: "10%" };
      case "ED": return { bottom: "67%", left: "88%" };
      case "DC": return { bottom: "80%", left: "50%", transform: "translateX(0%)" };
      default: return {};
    }
  };

  const toggleDisponibilidad = (dia, hora) => {
    const copia = { ...footballProfile.disponibilidad };
    copia[dia][hora] = !copia[dia][hora];
    setFootballProfile({ ...footballProfile, disponibilidad: copia });
  };

  const guardarPerfil = () => {
    localStorage.setItem("miPerfilFutbol", JSON.stringify(footballProfile));
    alert("Perfil guardado correctamente!");
  };

  return (
    <div
      className="login-hero"
      style={{
        background: "url('https://elonce-media.elonce.com/fotos/2025/01/30/l_1738240613_73999.webp') no-repeat center center/cover",
        backgroundSize: "cover",
        padding: "10px 0",
      }}
    >
      <div className="login-overlay"></div>
      <button
        className="home-button"
        onClick={() => navigate("/")}
        style={{ top: "10px", left: "10px", padding: "6px" }}
      >
        🏠
      </button>

      <div
        className="login-card"
        style={{
          maxWidth: "300px",
          padding: "14px",
          fontSize: "0.85rem",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ marginBottom: "12px", textAlign: "center" }}>Mi Perfil</h2>

        {/* Imagen y datos */}
        <div style={{ textAlign: "center", marginBottom: "10px", width: "100%" }}>
          {footballProfile.imagen ? (
            <img
              src={footballProfile.imagen}
              alt="Perfil"
              style={{
                width: "82px",
                height: "82px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #ff69b4",
                marginBottom: "6px",
              }}
            />
          ) : (
            <div
              style={{
                width: "82px",
                height: "82px",
                borderRadius: "50%",
                background: "#111",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#ff69b4",
                marginBottom: "6px",
                border: "2px solid #ff69b4",
              }}
            >
              Sin foto
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{
              display: "block",
              margin: "0 auto",
              padding: "4px",
              borderRadius: "6px",
              border: "1px solid #ff69b4",
              background: "#111",
              color: "#ff69b4",
              cursor: "pointer",
              width: "97%",
            }}
          />
        </div>

        {/* Inputs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
          <input
            type="number"
            placeholder="Edad"
            value={footballProfile.edad}
            onChange={(e) =>
              setFootballProfile({ ...footballProfile, edad: e.target.value })
            }
            style={{
              padding: "6px",
              borderRadius: "6px",
              border: "1px solid #ff69b4",
              background: "#111",
              color: "#ff69b4",
              width: "96%",
            }}
          />
          <textarea
            placeholder="Escribe una breve descripción"
            value={footballProfile.bio}
            onChange={(e) =>
              setFootballProfile({ ...footballProfile, bio: e.target.value })
            }
            style={{
              padding: "6px",
              borderRadius: "6px",
              border: "1px solid #ff69b4",
              background: "#111",
              color: "#ff69b4",
              minHeight: "50px",
              resize: "none",
              width: "96%",
            }}
          />
        </div>

        {!footballProfile.suscripcion && (
          <button
            className="btn-primary"
            style={{ width: "100%", margin: "6px 0", padding: "6px" }}
            onClick={() =>
              setFootballProfile({ ...footballProfile, suscripcion: true })
            }
          >
            Suscribirme para funciones premium
          </button>
        )}

        {/* Cancha */}
        <div
          style={{
            width: "100%",
            height: "360px",
            background: "green",
            border: "2px solid white",
            borderRadius: "6px",
            position: "relative",
            margin: "12px 0",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              width: "100%",
              height: "2px",
              background: "white",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "2px solid white",
              transform: "translate(-50%, -50%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "30%",
              width: "40%",
              height: "50px",
              border: "2px solid white",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "38%",
              width: "24%",
              height: "25px",
              border: "2px solid white",
            }}
          />

          {posiciones.map((pos) => (
            <div
              key={pos.id}
              onClick={() => handlePositionClick(pos.id)}
              style={{
                position: "absolute",
                width: "38px",
                height: "38px",
                borderRadius: "6px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: footballProfile.suscripcion ? "pointer" : "not-allowed",
                color: "#e3e3e3ff",
                fontWeight: "700",
                transition: "all 0.2s ease-in-out",
                fontSize: "0.8rem",
                ...getPositionStyle(pos.id),
                ...getPositionCoords(pos.id),
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform =
                  "scale(1.15) translate(-50%, -50%)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform =
                  "translate(-50%, -50%) scale(1)")
              }
            >
              {pos.id}
            </div>
          ))}
        </div>

        {/* Sección disponibilidad */}
        <div style={{ width: "100%", marginTop: "12px" }}>
          <h3 style={{ textAlign: "center", marginBottom: "6px" }}>Horario Disponible</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.75rem" }}>
            {dias.map((dia) => (
              <div key={dia} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ width: "70px" }}>{dia}</div>
                {horas.map((hora) => (
                  <div
                    key={hora}
                    onClick={() => toggleDisponibilidad(dia, hora)}
                    style={{
                      width: "40px",
                      height: "24px",
                      lineHeight: "24px",
                      textAlign: "center",
                      borderRadius: "4px",
                      cursor: "pointer",
                      backgroundColor: footballProfile.disponibilidad?.[dia]?.[hora] ? "#ff1493" : "#111",
                      border: "1px solid #ff69b4",
                      color: "#bababaff",
                      userSelect: "none",
                    }}
                  >
                    {hora}

                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <button
          className="btn-primary"
          style={{ width: "100%", padding: "6px", marginTop: "12px" }}
          onClick={guardarPerfil}
        >
          Guardar perfil
        </button>
      </div>
    </div>
  );
}
