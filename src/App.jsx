import { useState, useEffect } from "react";
import AdminShell from "./dashboards/AdminShell";
import FooterSitemapSingle from "./FooterSitemapSingle";
import "./App.css";

export default function App() {
  const [view, setView] = useState("inicio");

  // --- AUTH como lo tenías ---
  const readAuth = () => {
    let role = localStorage.getItem("role");
    let token = localStorage.getItem("token");

    if (!role || !token) {
      try {
        const session = JSON.parse(localStorage.getItem("session"));
        if (session) {
          role = role || (session.role ? String(session.role).toLowerCase() : null);
          token = token || session.token;
        }
      } catch {}
    }

    return { role, isLogged: !!token };
  };

  const init = readAuth();

  const [role, setRole] = useState(init.role);
  const [isLogged, setIsLogged] = useState(init.isLogged);

  const isAdmin = role === "admin" || role === "administrador";

  useEffect(() => {
    const syncAuth = () => {
      const { role, isLogged } = readAuth();
      setRole(role);
      setIsLogged(isLogged);
    };

    syncAuth();

    window.addEventListener("storage", syncAuth);
    window.addEventListener("auth:updated", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("auth:updated", syncAuth);
    };
  }, []);

  // Si es admin y está logueado, renderiza el SHELL ADMIN
  if (isLogged && isAdmin) {
    const session = (() => {
      try {
        return JSON.parse(localStorage.getItem("session"));
      } catch {
        return null;
      }
    })();

    return <AdminShell user={session} onLogout={() => setView("inicio")} />;
  }

  // --- DATA DEL MAPA DEL SITIO ---
  const sitemapItems = [
    {
      title: "Inicio",
      key: "inicio",
      links: [{ label: "Ir a Inicio", view: "inicio" }],
    },
    {
      title: "¿Quiénes Somos?",
      key: "quienes",
      links: [
        { label: "Historia", view: "historia" },
        { label: "Misión", view: "mision" },
        { label: "Visión", view: "vision" },
        { label: "Política de Calidad", view: "politica" },
        { label: "Información Institucional", view: "info" },
      ],
    },
    {
      title: "Novedades",
      key: "novedades",
      links: [
        { label: "Noticias", view: "noticias" },
        { label: "Actualizaciones", view: "actualizaciones" },
        { label: "Boletines", view: "boletines" },
      ],
    },
    {
      title: "Soporte",
      key: "soporte",
      links: [
        { label: "Ayuda", view: "ayuda" },
        { label: "Preguntas Frecuentes", view: "faq" },
        { label: "PQR", view: "pqr" },
      ],
    },
    {
      title: "Contáctenos",
      key: "contacto",
      links: [{ label: "Formulario de Contacto", view: "contacto" }],
    },
  ];

  // --- NAVEGACIÓN DESDE EL FOOTER + SCROLL SUAVE ---
  const handleNavigate = (viewKey) => {
    setView(viewKey);

    requestAnimationFrame(() => {
      const mainEl = document.querySelector("main");
      if (mainEl) {
        mainEl.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  };

  // --- COMPONENTES BASE ---
  const Card = ({ children }) => <div className="card">{children}</div>;

  const Input = (props) => <input {...props} className="input" />;

  const Button = ({ label }) => <button className="btn">{label}</button>;

  return (
    <div className="app">
      {/* NAV SUPERIOR (FIJO) */}
      <header className="topbar" role="banner">
        <div className="topbar-inner">

          {/* LOGO */}
          <div className="brand" aria-label="SGCM">
            <svg className="logo" viewBox="0 0 48 48">
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
              <div className="brand-title">
                SGCM – Sistema de Gestión de Citas Médicas
              </div>
              <div className="brand-sub">Salud • Calidad • Confianza</div>
            </div>
          </div>

          {/* MENÚ */}
          <ul className="menu">
            <li className="nav-item">
              <button
                className={`link ${view === "inicio" ? "active" : ""}`}
                onClick={() => setView("inicio")}
              >
                Inicio
              </button>
            </li>
          </ul>

          {/* ACCIONES DERECHA */}
          <div className="right">
            <span className="badge">Público</span>

            <button
              className="cta"
              onClick={() => window.dispatchEvent(new Event("auth:open"))}
            >
              Iniciar sesión
            </button>
          </div>

        </div>
      </header>

      {/* ===== CONTENIDO ===== */}
      <main>

        {view === "inicio" && (
          <Card>
            <h2>Inicio</h2>

            <p
              style={{
                fontSize: "1.4rem",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Bienvenido a nuestro sistema de citas
            </p>

            <p
              style={{
                fontSize: "0.95rem",
                color: "#555",
                lineHeight: "1.5",
              }}
            >
              El SGCM (Sistema de Gestión de Citas Médicas) es una plataforma
              diseñada para facilitar la programación, consulta y administración
              de citas entre pacientes y personal médico.
            </p>
          </Card>
        )}

        {view === "historia" && (
          <Card>
            <h2>Historia</h2>
            <p>
              En el año 2025 SGCM se desarrolla como una herramienta tecnológica
              para mejorar la organización y administración de las citas médicas.
            </p>
          </Card>
        )}

        {view === "mision" && (
          <Card>
            <h2>Misión</h2>
            <p>Brindar una plataforma tecnológica eficiente para la gestión de citas.</p>
          </Card>
        )}

        {view === "vision" && (
          <Card>
            <h2>Visión</h2>
            <p>Ser un sistema de referencia en la gestión digital de citas médicas.</p>
          </Card>
        )}

        {view === "politica" && (
          <Card>
            <h2>Política de Calidad</h2>
            <p>Compromiso con la calidad.</p>
          </Card>
        )}

        {view === "info" && (
          <Card>
            <h2>Información Institucional</h2>
            <p>Datos institucionales.</p>
          </Card>
        )}

        {view === "noticias" && (
          <Card>
            <h2>Noticias</h2>
          </Card>
        )}

        {view === "actualizaciones" && (
          <Card>
            <h2>Actualizaciones</h2>
          </Card>
        )}

        {view === "boletines" && (
          <Card>
            <h2>Boletines</h2>
          </Card>
        )}

        {view === "ayuda" && (
          <Card>
            <h2>Ayuda</h2>
          </Card>
        )}

        {view === "faq" && (
          <Card>
            <h2>Preguntas Frecuentes</h2>
          </Card>
        )}

        {view === "pqr" && (
          <Card>
            <h2>PQR</h2>
            <Input placeholder="Asunto" />
            <Input placeholder="Descripción" />
            <Button label="Enviar" />
          </Card>
        )}

        {view === "contacto" && (
          <Card>
            <h2>Formulario de Contacto</h2>
            <Input placeholder="Nombre" />
            <Input placeholder="Correo" />
            <Input placeholder="Mensaje" />
            <Button label="Enviar" />
          </Card>
        )}

      </main>

      {/* FOOTER */}
      <FooterSitemapSingle
        items={sitemapItems}
        onNavigate={handleNavigate}
      />
    </div>
  );
}