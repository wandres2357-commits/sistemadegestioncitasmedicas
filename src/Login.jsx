import { useState } from "react";
import { saveSession } from "./auth";
import "./login.css";

export default function Login({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      saveSession(data);
      onSuccess(data);
    } catch {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
  <div className="login-container">
    <div className="login-card">
      <h2>Iniciar sesión</h2>

      <input
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="login-error">{error}</p>}

      <button onClick={login}>Entrar</button>
    </div>
  </div>
);
}