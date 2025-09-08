import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function PublicarCancha() {
  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const horas = ["19:00", "20:00", "21:00", "22:00", "23:00"];

  const [cancha, setCancha] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    precio: "",
    disponibilidad: {},
  });

  const [publicadas, setPublicadas] = useState([]);

  useEffect(() => {
    // Inicializar disponibilidad
    const initDisp = {};
    dias.forEach(dia => {
      initDisp[dia] = {};
      horas.forEach(hora => initDisp[dia][hora] = false);
    });
    setCancha(prev => ({ ...prev, disponibilidad: initDisp }));

    // Traer canchas publicadas del localStorage
    const guardadas = localStorage.getItem("canchas");
    if (guardadas) setPublicadas(JSON.parse(guardadas));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCancha(prev => ({ ...prev, [name]: value }));
  };

  const toggleHora = (dia, hora) => {
    setCancha(prev => ({
      ...prev,
      disponibilidad: { 
        ...prev.disponibilidad, 
        [dia]: { ...prev.disponibilidad[dia], [hora]: !prev.disponibilidad[dia][hora] } 
      }
    }));
  };

  const publicar = (e) => {
    e.preventDefault();

    // Guardar solo los horarios seleccionados
    const disponibilidadGuardada = {};
    Object.keys(cancha.disponibilidad).forEach(dia => {
      const horasDisponibles = Object.keys(cancha.disponibilidad[dia]).filter(h => cancha.disponibilidad[dia][h]);
      if (horasDisponibles.length > 0) disponibilidadGuardada[dia] = horasDisponibles;
    });

    const nuevaCancha = {
      nombre: cancha.nombre,
      direccion: cancha.direccion,
      telefono: cancha.telefono,
      precio: cancha.precio,
      disponibilidad: disponibilidadGuardada
    };

    const nuevasCanchas = [...publicadas, nuevaCancha];
    setPublicadas(nuevasCanchas);
    localStorage.setItem("canchas", JSON.stringify(nuevasCanchas));

    alert("Cancha publicada con éxito!");

    // Reiniciar formulario
    const initDisp = {};
    dias.forEach(dia => {
      initDisp[dia] = {};
      horas.forEach(hora => initDisp[dia][hora] = false);
    });
    setCancha({ nombre: "", direccion: "", telefono: "", precio: "", disponibilidad: initDisp });
  };

  const borrarCancha = (index) => {
    if (!window.confirm("¿Deseas borrar esta cancha?")) return;
    const copia = [...publicadas];
    copia.splice(index, 1);
    setPublicadas(copia);
    localStorage.setItem("canchas", JSON.stringify(copia));
  };

  return (
    <div
      className="login-hero"
      style={{
        backgroundImage: `url("https://e00-xlk-ue-marca.uecdn.es/uploads/2025/03/30/67e8ec71c293f.jpeg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "20px",
        position: "relative"
      }}
    >
      {/* Overlay solo visual, no bloquea clicks */}
      <div
        className="login-overlay"
        style={{ pointerEvents: "none" }}
      ></div>

      {/* Lista de canchas publicadas */}
      <div
        style={{
          width: "300px",
          marginRight: "20px",
          background: "rgba(0,0,0,0.6)",
          borderRadius: "6px",
          padding: "10px",
          color: "#fff",
          maxHeight: "90vh",
          overflowY: "auto",
          zIndex: 1 // encima del overlay
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Mis Canchas Publicadas</h3>
        {publicadas.length === 0 ? (
          <div style={{ textAlign: "center" }}>Aún no has publicado ninguna cancha</div>
        ) : (
          publicadas.map((c, index) => (
            <div
              key={index}
              style={{
                marginBottom: "12px",
                border: "1px solid #ff69b4",
                borderRadius: "6px",
                padding: "6px",
                position: "relative",
              }}
            >
              <h4 style={{ margin: "4px 0" }}>{c.nombre}</h4>
              <p style={{ margin: "2px 0", fontSize: "0.8rem" }}>{c.direccion}</p>
              <p style={{ margin: "2px 0", fontSize: "0.8rem" }}>Tel: {c.telefono}</p>
              <p style={{ margin: "2px 0", fontSize: "0.8rem" }}>Precio: CLP {c.precio}</p>

              {/* Mostrar horarios guardados */}
              {Object.keys(c.disponibilidad).map(dia => (
                <p key={dia} style={{ margin: "2px 0", fontSize: "0.75rem" }}>
                  {dia}: {Array.isArray(c.disponibilidad[dia]) ? c.disponibilidad[dia].join(", ") : ""}
                </p>
              ))}

              <button
                onClick={() => borrarCancha(index)}
                style={{
                  background: "#ff1493",
                  border: "none",
                  color: "#fff",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  marginTop: "4px",
                }}
              >
                Borrar
              </button>
            </div>
          ))
        )}
      </div>

      {/* Formulario publicación */}
      <div className="login-card" style={{ maxWidth: "300px", padding: "14px", fontSize: "0.85rem" }}>
        <h2>Publica tu Cancha</h2>
        <form className="login-form" onSubmit={publicar}>
          <input
            type="text"
            placeholder="Nombre de la cancha"
            name="nombre"
            value={cancha.nombre}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            placeholder="Dirección"
            name="direccion"
            value={cancha.direccion}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            placeholder="Teléfono de contacto"
            name="telefono"
            value={cancha.telefono}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            placeholder="Precio por hora (CLP)"
            name="precio"
            value={cancha.precio}
            onChange={handleInputChange}
            min="10000"
            step="1000"
            required
          />

          {/* Selector de horarios */}
          <h3>Disponibilidad</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "0.8rem" }}>
            {dias.map(dia => (
              <div key={dia} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ width: "70px" }}>{dia}</div>
                {horas.map(hora => (
                  <div
                    key={hora}
                    onClick={() => toggleHora(dia, hora)}
                    style={{
                      width: "50px",
                      height: "24px",
                      lineHeight: "24px",
                      textAlign: "center",
                      borderRadius: "4px",
                      cursor: "pointer",
                      backgroundColor: cancha.disponibilidad[dia]?.[hora] ? "#1daf00ff" : "#ff0000ff",
                      border: "1px solid #111",
                      color: "#fff",
                      userSelect: "none",
                    }}
                  >
                    {hora}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: "10px" }}>
            Publicar Cancha
          </button>
        </form>

        <Link to="/" className="home-button" style={{ marginTop: "10px" }}>🏠</Link>
      </div>
    </div>
  );
}
