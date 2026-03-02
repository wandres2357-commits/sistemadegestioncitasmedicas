
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./Login";
import { getSession } from "./auth";

function Root() {
  const [showLogin, setShowLogin] = useState(false);

  // Si ya hay sesión activa, cerramos el login de entrada
  useEffect(() => {
    const session = getSession();
    if (session?.token) {
      setShowLogin(false);
    }
  }, []);

  return (
    <>
      <App />

      {/* Botón para abrir el login (solo ejemplo) */}
      {!showLogin && (
        <button
          onClick={() => setShowLogin(true)}
          style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}
        >
          Iniciar sesión
        </button>
      )}

      {/* Login como overlay/modal simple */}
      {showLogin && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1001
          }}
        >
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowLogin(false)}
              style={{
                position: "absolute",
                top: -36,
                right: 0,
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: 4,
                padding: "6px 10px",
                cursor: "pointer"
              }}
            >
              ✕
            </button>

            <Login
              onSuccess={() => {
                // saveSession(data) ya guarda token/role y dispara auth:updated
                window.dispatchEvent(new Event("auth:updated"));
                // Cerramos el modal; App.jsx hará la redirección a view="admin"
                setShowLogin(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);