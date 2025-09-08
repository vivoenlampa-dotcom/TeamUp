import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      // Guardar sesión en localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", email);

      alert(`¡Bienvenido!\nEmail: ${email}`);
      navigate("/"); // redirige al Home
    }
  };

  return (
    <div
      className="login-hero"
      style={{
        background: `url('https://images7.alphacoders.com/132/thumb-1920-1323374.png') no-repeat center center/cover`,
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
        <h1 className="hero-title" style={{ marginBottom: "20px" }}>
          Iniciar Sesión
        </h1>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">
            Ingresar
          </button>
        </form>
        <p style={{ marginTop: "12px", color: "#ff69b4" }}>
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            style={{ color: "#ff2c78", textDecoration: "none" }}
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
