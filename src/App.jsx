import { useState, useEffect } from "react";
import AdminDashboard from "./dashboards/AdminDashboard";

export default function App() {
  const [view, setView] = useState("inicio");
  const [openMenu, setOpenMenu] = useState(null);

  // Estado de autenticación/rol desde localStorage, con inicialización segura
  const [role, setRole] = useState(() => localStorage.getItem("role"));
  const [isLogged, setIsLogged] = useState(() => !!localStorage.getItem("token"));

  // Unificación de roles: "admin" y "administrador"
  const isAdmin = role === "admin" || role === "administrador";

  // Mantener sincronizado con cambios en localStorage (y opción de evento custom)
  useEffect(() => {
    const syncAuthFromLocalStorage = () => {
      setRole(localStorage.getItem("role"));
      setIsLogged(!!localStorage.getItem("token"));
    };

    // Sync inicial
    syncAuthFromLocalStorage();

    // Cambios desde otras pestañas/ventanas
    window.addEventListener("storage", syncAuthFromLocalStorage);

    // (Opcional) Si tu flujo de login despacha un evento personalizado:
    // window.dispatchEvent(new Event("auth:updated"));
    window.addEventListener("auth:updated", syncAuthFromLocalStorage);

    return () => {
      window.removeEventListener("storage", syncAuthFromLocalStorage);
      window.removeEventListener("auth:updated", syncAuthFromLocalStorage);
    };
  }, []);

  // Redirección automática al dashboard al entrar como admin
  useEffect(() => {
    if (isLogged && isAdmin) {
      setView((prev) => (prev === "admin" ? prev : "admin"));
    } else {
      // Si sales de sesión y estabas en el dashboard, regresa a inicio
      setView((prev) => (prev === "admin" ? "inicio" : prev));
    }
  }, [isLogged, isAdmin]);

  const MenuTitle = ({ label, menuKey }) => (
    <div
      onClick={() => setOpenMenu(openMenu === menuKey ? null : menuKey)}
      style={{
        padding: "12px 16px",
        fontWeight: "bold",
        cursor: "pointer",
        background: "#e3f2fd",
        color: "#1976d2",
        borderBottom: "1px solid #bbdefb"
      }}
    >
      {label}
    </div>
  );

  const MenuItem = ({ label, target }) => (
    <div
      onClick={() => setView(target)}
      style={{
        padding: "10px 28px",
        cursor: "pointer",
        background: view === target ? "#1976d2" : "#fff",
        color: view === target ? "#fff" : "#333",
        borderLeft: view === target ? "4px solid #2e7d32" : "4px solid transparent"
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
        SGCM – Sistema de Gestión Citas Medicas
      </header>

      <div style={{ display: "flex" }}>
        {/* MENU */}
        <aside
          style={{
            width: 300,
            background: "#ffffff",
            borderRight: "1px solid #ddd",
            minHeight: "calc(100vh - 64px)"
          }}
        >
          <MenuItem label="Inicio" target="inicio" />

          {/* Enlace al Dashboard Admin solo para rol admin/administrador */}
          {isAdmin && <MenuItem label="Dashboard Admin" target="admin" />}

          <MenuTitle label="¿Quiénes Somos?" menuKey="quienes" />
          {openMenu === "quienes" && (
            <>
              <MenuItem label="Historia" target="historia" />
              <MenuItem label="Misión" target="mision" />
              <MenuItem label="Visión" target="vision" />
              <MenuItem label="Política de Calidad" target="politica" />
              <MenuItem label="Información Institucional" target="info" />
            </>
          )}

          <MenuTitle label="Novedades" menuKey="novedades" />
          {openMenu === "novedades" && (
            <>
              <MenuItem label="Noticias" target="noticias" />
              <MenuItem label="Actualizaciones" target="actualizaciones" />
              <MenuItem label="Boletines" target="boletines" />
            </>
          )}

          <MenuTitle label="Soporte" menuKey="soporte" />
          {openMenu === "soporte" && (
            <>
              <MenuItem label="Ayuda" target="ayuda" />
              <MenuItem label="Preguntas Frecuentes" target="faq" />
              <MenuItem label="PQR" target="pqr" />
            </>
          )}

          <MenuTitle label="Contáctenos" menuKey="contacto" />
          {openMenu === "contacto" && (
            <MenuItem label="Formulario de Contacto" target="contacto" />
          )}
        </aside>

        {/* CONTENIDO */}
        <main style={{ flex: 1, padding: 36 }}>
          {/* INICIO PÚBLICO (cuando NO hay sesión) */}
          {!isLogged && view === "inicio" && (
            <Card>
              <h2 style={{ color: "#1976d2" }}>Inicio</h2>
              <p>Contenido público del sistema.</p>
            </Card>
          )}

          {/* DASHBOARD ADMIN */}
          {isLogged && isAdmin && view === "admin" && (
            <AdminDashboard />
          )}

          {/* Inicio original (cuando SÍ hay sesión) */}
          {isLogged && view === "inicio" && (
            <Card>
              <h2 style={{ color: "#1976d2" }}>Inicio</h2>
              <ul style={{ lineHeight: 2 }}>
                <li>Nosotros</li>
                <li>Áreas de Trabajo</li>
                <li>Calidad en el Servicio</li>
              </ul>
            </Card>
          )}

          {view === "historia" && <Card><h2>Historia</h2><p>Contenido histórico.</p></Card>}
          {view === "mision" && <Card><h2>Misión</h2><p>Nuestra misión institucional.</p></Card>}
          {view === "vision" && <Card><h2>Visión</h2><p>Nuestra visión institucional.</p></Card>}
          {view === "politica" && <Card><h2>Política de Calidad</h2><p>Compromiso con la calidad.</p></Card>}
          {view === "info" && <Card><h2>Información Institucional</h2><p>Datos institucionales.</p></Card>}

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
    </div>
  );
}
