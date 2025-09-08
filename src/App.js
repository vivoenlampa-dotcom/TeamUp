import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomeLanding from "./pages/HomeLanding";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import ReservarCancha from "./pages/ReservarCancha";
import BuscarPartido from "./pages/BuscarPartido";
import PublicarCancha from "./pages/PublicarCancha";
import Perfil from "./pages/Perfil";
import Resultados from "./pages/Resultados"; // <-- Importa la nueva página

// Componente para proteger rutas privadas
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route
          path="/reservar"
          element={
            <ProtectedRoute>
              <ReservarCancha />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buscar"
          element={
            <ProtectedRoute>
              <BuscarPartido />
            </ProtectedRoute>
          }
        />
        <Route
          path="/publicar"
          element={
            <ProtectedRoute>
              <PublicarCancha />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />

        {/* Nueva ruta para resultados de búsqueda */}
        <Route
          path="/resultados"
          element={
            <ProtectedRoute>
              <Resultados />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
