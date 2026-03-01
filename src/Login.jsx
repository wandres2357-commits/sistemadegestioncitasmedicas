import { useState } from "react";
import { saveSession } from "./auth";

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
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 320, background: "#fff", padding: 30 }}>
        <h2>Iniciar sesión</h2>

        <input placeholder="Usuario" onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button onClick={login}>Entrar</button>
      </div>
    </div>
  );
}