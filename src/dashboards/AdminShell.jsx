// src/dashboards/AdminShell.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import { logout } from "../auth";
import "./admin.css"; // paleta/header/sidebar/menu
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

function SectionTitle({ children }) {
  return <h2>{children}</h2>;
}

export default function AdminShell({ onLogout, user }) {
  const [section, setSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Refs para accesibilidad del menú
  const sidebarRef = useRef(null);
  const firstItemRef = useRef(null);

  // Cerrar con Escape + bloqueo de scroll del body
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
      // Foco al primer item del menú
      setTimeout(() => firstItemRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const MenuItem = ({ label, value, icon, refProp }) => (
    <button
      type="button"
      ref={refProp}
      onClick={() => {
        setSection(value);
        setMenuOpen(false); // cerrar al navegar
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
      {/* Skip link para accesibilidad */}
      <a href="#main-content" className="skip-link">
        Saltar al contenido
      </a>

      {/* HEADER */}
      <header className="admin-header" role="banner">
        <div className="admin-header-inner container">
          <div className="admin-title">
            {/* Hamburguesa solo en móvil */}
            <button
              type="button"
              className="admin-burger lg:hidden inline-flex items-center justify-center"
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              aria-controls="admin-sidebar"
              onClick={() => setMenuOpen(true)}
            >
              ☰
            </button>

            {/* Logo mini */}
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
            {user?.username ? (
              <span className="admin-user">({user.username})</span>
            ) : null}
          </div>

          <div className="admin-actions">
            <Button variant="primary" onClick={() => setSection("home")}>
              Inicio Admin
            </Button>

            <Button
              variant="danger"
              onClick={() => {
                logout();
                onLogout?.();
                window.dispatchEvent(new Event("auth:updated"));
              }}
            >
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      {/* OVERLAY móvil */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* LAYOUT PRINCIPAL CON TAILWIND */}
      <div className="min-h-dvh grid grid-cols-1 lg:grid-cols-[260px_1fr]">
        {/* SIDEBAR */}
        <aside
          id="admin-sidebar"
          ref={sidebarRef}
          aria-label="Menú de administración"
          className={[
            "bg-white border-r",
            // drawer móvil
            "fixed inset-y-0 left-0 w-64 z-50 transform transition-transform duration-300 overflow-y-auto",
            menuOpen ? "translate-x-0" : "-translate-x-full",
            // desktop
            "lg:static lg:translate-x-0 lg:block lg:h-[calc(100dvh-var(--admin-header-h))] lg:overflow-y-auto",
            "dark:bg-slate-900 dark:text-white",
          ].join(" ")}
        >
          <div className="admin-sidebar-head">
            <span>Administrador del panel de control</span>
            {/* Botón cerrar solo en móvil */}
            <button
              type="button"
              className="admin-close lg:hidden"
              aria-label="Cerrar menú"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
          </div>

          <nav className="admin-menu" role="navigation">
            <MenuItem
              refProp={firstItemRef}
              label="Inicio Admin"
              value="home"
              icon="🏠"
            />
            <MenuItem label="Pacientes" value="pacientes" icon="👤" />
            <MenuItem label="Citas" value="citas" icon="📅" />
            <MenuItem label="Usuarios" value="usuarios" icon="🛡️" />
            <MenuItem label="Reportes" value="reportes" icon="📊" />
            <MenuItem label="Configuración" value="config" icon="⚙️" />
          </nav>
        </aside>

        {/* CONTENIDO */}
        <main
          id="main-content"
          className="px-4 sm:px-6 lg:px-8 py-6 bg-slate-50 min-h-dvh"
        >
          {content}
        </main>
      </div>
    </div>
  );
}
