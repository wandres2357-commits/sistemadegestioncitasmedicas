import { useState, useEffect } from "react";
import AdminShell from "./dashboards/AdminShell";

export default function App() {

  const [view, setView] = useState("inicio");
  const [openMenu, setOpenMenu] = useState(null);

  // =============================
  // AUTENTICACIÓN
  // =============================

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

  // =============================
  // ADMIN DASHBOARD
  // =============================

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

  // =============================
  // COMPONENTES UI
  // =============================

  const MenuItem = ({ label, target }) => (
    <div
      onClick={() => {
        setView(target);
        setOpenMenu(null);
      }}
      style={{
        padding: "10px 16px",
        cursor: "pointer",
        whiteSpace: "nowrap"
      }}
    >
      {label}
    </div>
  );

  const Card = ({ children }) => (
    <div
      style={{
        background: "#fff",
        padding: 28,
        borderRadius: 8,
        maxWidth: 900,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
      }}
    >
      {children}
    </div>
  );

  const Input = (props) => (
    <input
      {...props}
      style={{
        width: "100%",
        padding: 10,
        marginBottom: 14,
        borderRadius: 4,
        border: "1px solid #90caf9"
      }}
    />
  );

  const Button = ({ label }) => (
    <button
      style={{
        padding: "10px 20px",
        border: "none",
        borderRadius: 4,
        background: "#2e7d32",
        color: "#fff",
        fontWeight: "bold",
        cursor: "pointer"
      }}
    >
      {label}
    </button>
  );

  // =============================
  // VISTA PUBLICA
  // =============================

  return (
    <div style={{ minHeight: "100vh", fontFamily: "Segoe UI", background: "#f4f6f8" }}>

      {/* HEADER */}
      <header
        style={{
          background: "#1976d2",
          color: "#fff",
          padding: "16px 28px",
          fontWeight: "bold"
        }}
      >
        SGCM – Sistema de Gestión Citas Médicas
      </header>

      {/* NAVBAR */}
      <nav
  style={{
    display: "flex",
    gap: 30,
    padding: "10px 28px",
    background: "#fff",
    borderBottom: "1px solid #ddd"
  }}
>

  <div
    style={{ fontWeight: "bold", cursor: "pointer" }}
    onClick={() => setView("inicio")}
  >
    Inicio
  </div>

  {/* QUIENES SOMOS */}
  <div
    style={{ position: "relative", fontWeight: "bold" }}
    onMouseEnter={() => setOpenMenu("quienes")}
    onMouseLeave={() => setOpenMenu(null)}
  >
    <span style={{ cursor: "pointer" }}>¿Quiénes Somos?</span>

    {openMenu === "quienes" && (
      <div style={dropdownStyle}>
        <MenuItem label="Historia" target="historia" />
        <MenuItem label="Misión" target="mision" />
        <MenuItem label="Visión" target="vision" />
        <MenuItem label="Política de Calidad" target="politica" />
        <MenuItem label="Información Institucional" target="info" />
      </div>
    )}
  </div>

  {/* NOVEDADES */}
  <div
    style={{ position: "relative", fontWeight: "bold" }}
    onMouseEnter={() => setOpenMenu("novedades")}
    onMouseLeave={() => setOpenMenu(null)}
  >
    <span style={{ cursor: "pointer" }}>Novedades</span>

    {openMenu === "novedades" && (
      <div style={dropdownStyle}>
        <MenuItem label="Noticias" target="noticias" />
        <MenuItem label="Actualizaciones" target="actualizaciones" />
        <MenuItem label="Boletines" target="boletines" />
      </div>
    )}
  </div>

  {/* SOPORTE */}
  <div
    style={{ position: "relative", fontWeight: "bold" }}
    onMouseEnter={() => setOpenMenu("soporte")}
    onMouseLeave={() => setOpenMenu(null)}
  >
    <span style={{ cursor: "pointer" }}>Soporte</span>

    {openMenu === "soporte" && (
      <div style={dropdownStyle}>
        <MenuItem label="Ayuda" target="ayuda" />
        <MenuItem label="Preguntas Frecuentes" target="faq" />
        <MenuItem label="PQR" target="pqr" />
      </div>
    )}
  </div>

  {/* CONTACTO */}
  <div
    style={{ position: "relative", fontWeight: "bold" }}
    onMouseEnter={() => setOpenMenu("contacto")}
    onMouseLeave={() => setOpenMenu(null)}
  >
    <span style={{ cursor: "pointer" }}>Contáctenos</span>

    {openMenu === "contacto" && (
      <div style={dropdownStyle}>
        <MenuItem label="Formulario de Contacto" target="contacto" />
      </div>
    )}
  </div>

</nav>

      {/* CONTENIDO */}
      <main style={{ padding: 36 }}>

        {view === "inicio" && (
          <Card>
            <h2>Inicio</h2>
            <p>Contenido público del sistema.</p>
          </Card>
        )}

        {view === "historia" && <Card><h2>Historia</h2></Card>}
        {view === "mision" && <Card><h2>Misión</h2></Card>}
        {view === "vision" && <Card><h2>Visión</h2></Card>}
        {view === "politica" && <Card><h2>Política de Calidad</h2></Card>}
        {view === "info" && <Card><h2>Información Institucional</h2></Card>}

        {view === "noticias" && <Card><h2>Noticias</h2></Card>}
        {view === "actualizaciones" && <Card><h2>Actualizaciones</h2></Card>}
        {view === "boletines" && <Card><h2>Boletines</h2></Card>}

        {view === "ayuda" && <Card><h2>Ayuda</h2></Card>}
        {view === "faq" && <Card><h2>Preguntas Frecuentes</h2></Card>}

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

    </div>
  );
}

// Dropdown style
const dropdownStyle = {
  position: "absolute",
  top: 30,
  background: "#fff",
  border: "1px solid #ddd",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  minWidth: 220,
  zIndex: 999
};