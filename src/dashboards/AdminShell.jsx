
// src/dashboards/AdminShell.jsx
import { useState, useMemo } from "react";
import AdminDashboard from "./AdminDashboard";
import { logout } from "../auth";

const Card = ({ children }) => (
  <div
    style={{
      background: "#fff",
      padding: 24,
      borderRadius: 8,
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    }}
  >
    {children}
  </div>
);

function SectionTitle({ children }) {
  return <h2 style={{ color: "#1976d2", marginTop: 0 }}>{children}</h2>;
}

export default function AdminShell({ onLogout, user }) {
  const [section, setSection] = useState("home");

  const MenuItem = ({ label, value }) => (
    <div
      onClick={() => setSection(value)}
      style={{
        padding: "10px 16px",
        cursor: "pointer",
        background: section === value ? "#1976d2" : "#fff",
        color: section === value ? "#fff" : "#333",
        borderLeft: section === value ? "4px solid #2e7d32" : "4px solid transparent",
      }}
    >
      {label}
    </div>
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
    <div style={{ minHeight: "100vh", fontFamily: "Segoe UI", background: "#f4f6f8" }}>
      {/* HEADER ADMIN */}
      <header
        style={{
          background: "#0d47a1",
          color: "#fff",
          padding: "16px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ fontWeight: "bold" }}>
          SGCM — Panel de Administración
          {user?.username ? (
            <span style={{ fontWeight: "normal", marginLeft: 12, fontSize: 14, opacity: 0.9 }}>
              ({user.username})
            </span>
          ) : null}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setSection("home")}
            style={{
              padding: "8px 12px",
              background: section === "home" ? "#1565c0" : "transparent",
              color: "#fff",
              border: "1px solid rgba(255,255,255,.4)",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Inicio Admin
          </button>
          <button
            onClick={() => {
              logout(); // limpia session, token, role
              onLogout?.();
              window.dispatchEvent(new Event("auth:updated"));
            }}
            style={{
              padding: "8px 12px",
              background: "#c62828",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <div style={{ display: "flex" }}>
        {/* SIDEBAR ADMIN */}
        <aside
          style={{
            width: 300,
            background: "#ffffff",
            borderRight: "1px solid #ddd",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          <div
            style={{
              padding: "12px 16px",
              fontWeight: "bold",
              background: "#e3f2fd",
              color: "#1976d2",
              borderBottom: "1px solid #bbdefb",
            }}
          >
            Administrador del panel de control
          </div>

          <MenuItem label="Inicio Admin" value="home" />
          <MenuItem label="Pacientes" value="pacientes" />
          <MenuItem label="Citas" value="citas" />
          <MenuItem label="Usuarios" value="usuarios" />
          <MenuItem label="Reportes" value="reportes" />
          <MenuItem label="Configuración" value="config" />
        </aside>

        {/* CONTENIDO ADMIN */}
        <main style={{ flex: 1, padding: 36 }}>{content}</main>
      </div>
    </div>
  );
}