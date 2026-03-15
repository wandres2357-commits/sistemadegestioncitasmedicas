
// src/dashboards/AdminShell.jsx
import { useState, useMemo } from "react";
import AdminDashboard from "./AdminDashboard";
import "./admin.css";

function Card({ children }) {
  return <div className="admin-card">{children}</div>;
}

function SectionTitle({ children }) {
  return <h2>{children}</h2>;
}

export default function AdminShell({ onLogout, user }) {
  const [section, setSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const MenuItem = ({ label, value, icon }) => (
    <button
      type="button"
      onClick={() => {
        setSection(value);
        setMenuOpen(false);
      }}
      className={`admin-menu-item ${
        section === value ? "admin-menu-item--active" : ""
      }`}
      aria-current={section === value ? "page" : undefined}
    >
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      <span>{label}</span>
    </button>
  );

  const content = useMemo(() => {
    switch (section) {
      case "home":
        return <AdminDashboard />;

      case "pacientes":
        return (
          <Card>
            <SectionTitle>Gestión de Pacientes</SectionTitle>
            <p>Registro, actualización y consulta de pacientes.</p>
          </Card>
        );

      case "citas":
        return (
          <Card>
            <SectionTitle>Gestión de Citas</SectionTitle>
            <p>Agenda, reasignación y control de citas.</p>
          </Card>
        );

      case "usuarios":
        return (
          <Card>
            <SectionTitle>Usuarios del Sistema</SectionTitle>
            <p>Altas, bajas, roles y permisos.</p>
          </Card>
        );

      case "reportes":
        return (
          <Card>
            <SectionTitle>Reportes</SectionTitle>
            <p>Indicadores y exportaciones.</p>
          </Card>
        );

      case "config":
        return (
          <Card>
            <SectionTitle>Configuración</SectionTitle>
            <p>Parámetros del sistema y preferencias.</p>
          </Card>
        );

      default:
        return <AdminDashboard />;
    }
  }, [section]);

  return (
    <div className="admin-app">
      {/* HEADER */}
      <header className="admin-header" role="banner">
        <div className="admin-header-inner">
          <div className="admin-title">
            {/* botón hamburguesa para móvil */}
            <button
              type="button"
              className="admin-burger"
              aria-label="Abrir menú"
              onClick={() => setMenuOpen(true)}
            >
              ☰
            </button>

            {/* logo mini */}
            <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
              <defs>
                <linearGradient id="gadmin" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#bbdefb" />
                  <stop offset="1" stopColor="#90caf9" />
                </linearGradient>
              </defs>

              <circle cx="24" cy="24" r="18" fill="url(#gadmin)" />
              <rect x="22" y="12" width="4" height="24" rx="2" fill="#0d47a1" />
              <rect x="12" y="22" width="24" height="4" rx="2" fill="#0d47a1" />
            </svg>

            <span>SGCM — Panel de Administración</span>

            {user?.username && (
              <span className="admin-user">({user.username})</span>
            )}
          </div>

          <div className="admin-actions">
            <button
              type="button"
              className="admin-btn admin-btn--primary"
              onClick={() => setSection("home")}
            >
              Inicio Admin
            </button>

            {/* Cambio solicitado en el handler de cierre de sesión */}
            <button
              type="button"
              className="admin-btn admin-btn--danger"
              onClick={() => {
                onLogout();
              }}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* overlay móvil */}
      {menuOpen && (
        <div
          className="admin-overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* layout */}
      <div className="admin-layout">
        {/* SIDEBAR */}
        <aside className={`admin-sidebar ${menuOpen ? "is-open" : ""}`}>
          <div className="admin-sidebar-head">Administrador del panel de control</div>

          <nav className="admin-menu" aria-label="Menú de administración">
            <MenuItem label="Inicio Admin" value="home" icon="🏠" />
            <MenuItem label="Pacientes" value="pacientes" icon="👤" />
            <MenuItem label="Citas" value="citas" icon="📅" />
            <MenuItem label="Usuarios" value="usuarios" icon="🛡️" />
            <MenuItem label="Reportes" value="reportes" icon="📊" />
            <MenuItem label="Configuración" value="config" icon="⚙️" />
          </nav>
        </aside>

        {/* CONTENIDO */}
        <main className="admin-content">{content}</main>
      </div>
    </div>
  );
}
``