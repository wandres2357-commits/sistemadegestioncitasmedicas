
import { useState, useEffect } from "react";
import AdminShell from "./dashboards/AdminShell"; // << nuevo shell admin

export default function App() {
  const [view, setView] = useState("inicio");
  const [openMenu, setOpenMenu] = useState(null);

  // Lee valores iniciales desde localStorage (token/role o desde session como respaldo)
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

  // Unificación de rol admin/administrador
  const isAdmin = role === "admin" || role === "administrador";

  // Sincronizar con cambios en localStorage (login/logout)
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

  // Si es admin y está logueado, renderiza el SHELL ADMIN y listo.
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

  // --- COMPONENTES BASE (ajustados para barra horizontal) ---
  const MenuTitle = ({ label, menuKey }) => (
    <div
      onClick={() => setOpenMenu(openMenu === menuKey ? null : menuKey)}
      style={{
        position: "relative",
        padding: "10px 14px",
        fontWeight: 600,
        cursor: "pointer",
        color: "#0d47a1",
        background: "transparent",
        borderRadius: 6,
        userSelect: "none",
        transition: "background .15s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#e3f2fd")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {label}
      {/* Indicador simple ▼ */}
      <span style={{ marginLeft: 6, fontSize: 12, color: "#1565c0" }}>
        ▼
      </span>
      {/* Submenú desplegable */}
      {openMenu === menuKey && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            minWidth: 220,
            background: "#ffffff",
            border: "1px solid #e0e0e0",
            borderRadius: 8,
            marginTop: 8,
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            overflow: "hidden",
            zIndex: 20,
          }}
        >
          {/* Los hijos (MenuItem) los inyectaremos donde usemos MenuTitle */}
        </div>
      )}
    </div>
  );

  // Para usarlo dentro de la barra y también dentro de los dropdown
  const MenuItem = ({ label, target, compact = false }) => (
    <div
      onClick={() => setView(target)}
      style={{
        padding: compact ? "10px 14px" : "10px 16px",
        cursor: "pointer",
        color: view === target ? "#fff" : "#0f172a",
        background: view === target ? "#1976d2" : "transparent",
        borderRadius: compact ? 0 : 6,
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        if (view !== target) e.currentTarget.style.background = "#f1f5f9";
      }}
      onMouseLeave={(e) => {
        if (view !== target) e.currentTarget.style.background = "transparent";
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
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
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
        border: "1px solid #90caf9",
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
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ minHeight: "100vh", fontFamily: "Segoe UI", background: "#f4f6f8" }}>
      {/* HEADER */}
      <header
        style={{
          background: "#1976d2",
          color: "#fff",
          padding: "16px 28px",
          fontWeight: "bold",
        }}
      >
        SGCM – Sistema de Gestión Citas Medicas
      </header>

      {/* NAV HORIZONTAL (centrado) */}
      <nav
        style={{
          position: "sticky",
          top: 0,               // queda pegado bajo el header al hacer scroll
          zIndex: 10,
          background: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
        }}
        onClick={() => {
          // Al hacer click fuera de un dropdown lo cerramos (opcional)
          if (openMenu) setOpenMenu(null);
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "10px 16px",
            display: "flex",
            justifyContent: "center", // <-- centrado horizontal
            alignItems: "center",
            gap: 12,
            position: "relative",
          }}
        >
          {/* Elementos de primer nivel en la barra */}
          <MenuItem label="Inicio" target="inicio" />

          {/* Grupos con dropdown */}
          <div style={{ position: "relative" }}>
            <div onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === "quienes" ? null : "quienes"); }}>
              <MenuTitle label="¿Quiénes Somos?" menuKey="quienes" />
            </div>
            {openMenu === "quienes" && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  minWidth: 240,
                  background: "#ffffff",
                  border: "1px solid #e0e0e0",
                  borderRadius: 8,
                  marginTop: 8,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                  zIndex: 20,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <MenuItem compact label="Historia" target="historia" />
                <MenuItem compact label="Misión" target="mision" />
                <MenuItem compact label="Visión" target="vision" />
                <MenuItem compact label="Política de Calidad" target="politica" />
                <MenuItem compact label="Información Institucional" target="info" />
              </div>
            )}
          </div>

          <div style={{ position: "relative" }}>
            <div onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === "novedades" ? null : "novedades"); }}>
              <MenuTitle label="Novedades" menuKey="novedades" />
            </div>
            {openMenu === "novedades" && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  minWidth: 220,
                  background: "#ffffff",
                  border: "1px solid #e0e0e0",
                  borderRadius: 8,
                  marginTop: 8,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                  zIndex: 20,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <MenuItem compact label="Noticias" target="noticias" />
                <MenuItem compact label="Actualizaciones" target="actualizaciones" />
                <MenuItem compact label="Boletines" target="boletines" />
              </div>
            )}
          </div>

          <div style={{ position: "relative" }}>
            <div onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === "soporte" ? null : "soporte"); }}>
              <MenuTitle label="Soporte" menuKey="soporte" />
            </div>
            {openMenu === "soporte" && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  minWidth: 220,
                  background: "#ffffff",
                  border: "1px solid #e0e0e0",
                  borderRadius: 8,
                  marginTop: 8,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                  zIndex: 20,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <MenuItem compact label="Ayuda" target="ayuda" />
                <MenuItem compact label="Preguntas Frecuentes" target="faq" />
                <MenuItem compact label="PQR" target="pqr" />
              </div>
            )}
          </div>

          <div style={{ position: "relative" }}>
            <div onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === "contacto" ? null : "contacto"); }}>
              <MenuTitle label="Contáctenos" menuKey="contacto" />
            </div>
            {openMenu === "contacto" && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  minWidth: 260,
                  background: "#ffffff",
                  border: "1px solid #e0e0e0",
                  borderRadius: 8,
                  marginTop: 8,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                  zIndex: 20,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <MenuItem compact label="Formulario de Contacto" target="contacto" />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* CONTENIDO PÚBLICO */}
      <main style={{ maxWidth: 1200, margin: "24px auto", padding: "0 16px" }}>
        {view === "inicio" && (
          <Card>
            <h2 style={{ color: "#1976d2" }}>Inicio</h2>
            <p>Contenido público del sistema.</p>
          </Card>
        )}

        {view === "historia" && (
          <Card>
            <h2>Historia</h2>
            <p>Contenido histórico.</p>
          </Card>
        )}
        {view === "mision" && (
          <Card>
            <h2>Misión</h2>
            <p>Nuestra misión institucional.</p>
          </Card>
        )}
        {view === "vision" && (
          <Card>
            <h2>Visión</h2>
            <p>Nuestra visión institucional.</p>
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
    </div>
  );
}
