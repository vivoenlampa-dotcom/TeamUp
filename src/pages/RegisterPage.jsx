import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !password || !confirmPassword) {
      alert("Por favor completa todos los campos.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    alert(`Cuenta creada!\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}`);
    navigate("/login"); // redirige al login
  };

  return (
    <div
      className="login-hero"
      style={{
        background: `url('https://static.foxdeportes.com/2025/04/07/messibatalla_18_57_33_324.jpg') no-repeat center center/cover`,
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
        position: "relative"
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
        <h1 className="hero-title" style={{ marginBottom: "20px" }}>Registrarse</h1>
        <form onSubmit={handleRegister} className="login-form">
          <input
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Repetir contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">Crear cuenta</button>
        </form>
        <p style={{ marginTop: "12px", color: "#ff69b4" }}>
          ¿Ya tienes cuenta? <Link to="/login" style={{ color: "#ff2c78", textDecoration: "none" }}>Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
}
