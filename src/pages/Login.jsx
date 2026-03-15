
// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./login.css";

export default function Login({ onSuccess }) {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();

      // Asegúrate de mapear a lo que realmente devuelve tu API
      const payload = {
        user: data.user ?? { id: data.id, username: data.username },
        role: data.role ?? data.user?.role ?? "usuario",
        token: data.token ?? data.accessToken ?? null,
      };

      await login(payload);

      if (onSuccess) onSuccess();
    } catch {
      setError("Usuario o contraseña incorrecta");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="login-container fade-in">
      <div className="login-card">
        <h2>Iniciar sesión</h2>

        <input
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {error && <p className="error">{error}</p>}

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Iniciando sesión..." : "Entrar"}
        </button>

        {loading && <div className="spinner"></div>}
      </div>
    </div>
  );
}