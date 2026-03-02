import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./Login";
import { getSession } from "./auth";

function Root() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  // Lee auth desde localStorage/session
  const readAuth = useCallback(() => {
    try {
      const session = getSession();
      const token = session?.token || localStorage.getItem("token");
      return !!token;
    } catch {
      return !!localStorage.getItem("token");
    }
  }, []);

  // Sincroniza al montar y cuando cambian llaves (auth:updated / storage)
  useEffect(() => {
    const sync = () => setIsLogged(readAuth());
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("auth:updated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("auth:updated", sync);
    };
  }, [readAuth]);

  // Si ya hay sesión activa, asegúrate de cerrar el modal de login
  useEffect(() => {
    if (isLogged) setShowLogin(false);
  }, [isLogged]);

  return (
    <>
      <App />

      {/* Botón para abrir el login: SOLO si NO estás logueado */}
      {!isLogged && !showLogin && (
        <button
          onClick={() => setShowLogin(true)}
          style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}
        >
          Iniciar sesión
        </button>
      )}

      {/* Login como modal CENTRADO, SIN fondo desvanecido detrás */}
      {showLogin && !isLogged && (
        <div
          style={{
            position: "fixed",
            inset: 0,
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
                // saveSession(data) debe disparar auth:updated
                window.dispatchEvent(new Event("auth:updated"));
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