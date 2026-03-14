// src/App.jsx
import { useState, useEffect } from "react";
import AdminShell from "./dashboards/AdminShell";
import "./App.css"; // <= importante

export default function App() {
  const [view, setView] = useState("inicio");
  // ... (tu lógica de auth sin cambios)

  if (isLogged && isAdmin) {
    const session = (() => {
      try { return JSON.parse(localStorage.getItem("session")); } catch { return null; }
    })();
    return <AdminShell user={session} onLogout={() => setView("inicio")} />;
  }

  const Card = ({ children }) => <div className="card">{children}</div>;
  const Input = (props) => <input {...props} className="input" />;
  const Button = ({ label }) => <button className="btn">{label}</button>;

  return (
    <div className="app">
      {/* NAV SUPERIOR */}
      <header className="topbar" role="banner">
        <div className="topbar-inner">
          <div className="brand" aria-label="SGCM">
            {/* Reemplaza por tu logo si quieres */}
            <svg className="logo" viewBox="0 0 48 48" aria-hidden="true">
              <defs>
                <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#1976d2" />
                  <stop offset="1" stopColor="#42a5f5" />
                </linearGradient>
              </defs>
              <circle cx="24" cy="24" r="22" fill="url(#g1)" />
              <rect x="21" y="10" width="6" height="28" rx="3" fill="#fff" />
              <rect x="10" y="21" width="28" height="6" rx="3" fill="#fff" />
            </svg>
            <div>
              <div className="brand-title">SGCM – Sistema de Gestión de Citas Médicas</div>
              <div className="brand-sub">Salud • Calidad • Confianza</div>
            </div>
          </div>

          <ul className="menu" role="menubar" aria-label="Navegación principal">
            <li className="nav-item" role="none">
              <button
                className={`link ${view === "inicio" ? "active" : ""}`}
                onClick={() => setView("inicio")}
                role="menuitem"
              >
                Inicio
              </button>
            </li>

            <li className="nav-item" role="none">
              <button className="link" role="menuitem" aria-haspopup="true" aria-expanded="false">
                ¿Quiénes Somos?
              </button>
              <div className="dropdown" role="menu" aria-label="¿Quiénes Somos?">
                <button className={`menu-btn ${view === "historia" ? "active" : ""}`} onClick={() => setView("historia")}>Historia</button>
                <button className={`menu-btn ${view === "mision" ? "active" : ""}`} onClick={() => setView("mision")}>Misión</button>
                <button className={`menu-btn ${view === "vision" ? "active" : ""}`} onClick={() => setView("vision")}>Visión</button>
                <button className={`menu-btn ${view === "politica" ? "active" : ""}`} onClick={() => setView("politica")}>Política de Calidad</button>
                <button className={`menu-btn ${view === "info" ? "active" : ""}`} onClick={() => setView("info")}>Información Institucional</button>
              </div>
            </li>

            <li className="nav-item" role="none">
              <button className="link" role="menuitem" aria-haspopup="true" aria-expanded="false">Novedades</button>
              <div className="dropdown" role="menu" aria-label="Novedades">
                <button className={`menu-btn ${view === "noticias" ? "active" : ""}`} onClick={() => setView("noticias")}>Noticias</button>
                <button className={`menu-btn ${view === "actualizaciones" ? "active" : ""}`} onClick={() => setView("actualizaciones")}>Actualizaciones</button>
                <button className={`menu-btn ${view === "boletines" ? "active" : ""}`} onClick={() => setView("boletines")}>Boletines</button>
              </div>
            </li>

            <li className="nav-item" role="none">
              <button className="link" role="menuitem" aria-haspopup="true" aria-expanded="false">Soporte</button>
              <div className="dropdown" role="menu" aria-label="Soporte">
                <button className={`menu-btn ${view === "ayuda" ? "active" : ""}`} onClick={() => setView("ayuda")}>Ayuda</button>
                <button className={`menu-btn ${view === "faq" ? "active" : ""}`} onClick={() => setView("faq")}>Preguntas Frecuentes</button>
                <button className={`menu-btn ${view === "pqr" ? "active" : ""}`} onClick={() => setView("pqr")}>PQR</button>
              </div>
            </li>

            <li className="nav-item" role="none">
              <button className="link" role="menuitem" aria-haspopup="true" aria-expanded="false">Contáctenos</button>
              <div className="dropdown" role="menu" aria-label="Contáctenos">
                <button className={`menu-btn ${view === "contacto" ? "active" : ""}`} onClick={() => setView("contacto")}>Formulario de Contacto</button>
              </div>
            </li>
          </ul>

          <div className="right">
            <span className="badge">Público</span>
            <button
              className="cta"
              onClick={() => window.dispatchEvent(new Event("auth:open"))}
              title="Abrir inicio de sesión (placeholder)"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </header>

      {/* CONTENIDO */}
      <main>
        {/* ... tus Cards según 'view' (igual que ya lo tienes) ... */}
      </main>
    </div>
  );
}
``