import { useState } from "react";
import App from "./App";

export default function AuthWrapper() {
  const [user, setUser] = useState(null);

  const login = (role) => {
    setUser({ role });
  };

  if (!user) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f8",
        fontFamily: "Segoe UI"
      }}>
        <div style={{
          background: "#fff",
          padding: 32,
          borderRadius: 8,
          width: 320,
          boxShadow: "0 4px 12px rgba(0,0,0,.15)"
        }}>
          <h2 style={{ textAlign: "center", color: "#1976d2" }}>
            Iniciar Sesión
          </h2>

          <button
            onClick={() => login("user")}
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 12,
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer"
            }}
          >
            Entrar como Usuario
          </button>

          <button
            onClick={() => login("admin")}
            style={{
              width: "100%",
              padding: 12,
              background: "#2e7d32",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer"
            }}
          >
            Entrar como Administrador
          </button>
        </div>
      </div>
    );
  }

  return <App />;
}