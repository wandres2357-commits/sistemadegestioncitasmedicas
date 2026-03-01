import { useState } from "react";

export default function App() {
  const role = localStorage.getItem("role"); // admin | user | null
  const isLogged = !!role;

  const [view, setView] = useState("inicio");
  const [openMenu, setOpenMenu] = useState(null);
  const [tipoDocumento, setTipoDocumento] = useState("");

  /* COMPONENTES REUTILIZABLES */
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

  /* PROTECCIÓN ADMIN */
  if (isLogged && role !== "admin") {
    return (
      <div style={{ padding: 40, fontFamily: "Segoe UI" }}>
        <h2>No autorizado</h2>
        <p>Este panel es solo para administradores.</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", fontFamily: "Segoe UI", background: "#f4f6f8" }}>
      {/* HEADER */}
      <header
        style={{
          background: "#1976d2",
          color: "#fff",
          padding: "16px 28px",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        SGCM – Sistema de Gestión Citas Médicas

        {isLogged && (
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            style={{
              background: "#e53935",
              border: "none",
              color: "#fff",
              padding: "6px 12px",
              borderRadius: 4,
              cursor: "pointer"
            }}
          >
            Cerrar sesión
          </button>
        )}
      </header>

      <div style={{ display: "flex" }}>
        {/* MENÚ PÚBLICO */}
        {!isLogged && (
          <aside
            style={{
              width: 300,
              background: "#ffffff",
              borderRight: "1px solid #ddd",
              minHeight: "calc(100vh - 64px)"
            }}
          >
            <MenuItem label="Inicio" target="inicio" />

            <MenuTitle label="¿Quiénes Somos?" menuKey="quienes" />
            {openMenu === "quienes" && (
              <>
                <MenuItem label="Historia" target="historia" />
                <MenuItem label="Misión" target="mision" />
                <MenuItem label="Visión" target="vision" />
              </>
            )}

            <MenuTitle label="Contáctenos" menuKey="contacto" />
            {openMenu === "contacto" && (
              <MenuItem label="Formulario de Contacto" target="contacto" />
            )}
          </aside>
        )}

        {/* MENÚ ADMIN */}
        {role === "admin" && (
          <aside
            style={{
              width: 300,
              background: "#ffffff",
              borderRight: "1px solid #ddd",
              minHeight: "calc(100vh - 64px)"
            }}
          >
            <MenuItem label="Inicio" target="inicio" />

            <MenuTitle label="Pacientes" menuKey="pacientes" />
            {openMenu === "pacientes" && (
              <MenuItem label="Registrar Paciente" target="registrarPaciente" />
            )}
          </aside>
        )}

        {/* CONTENIDO */}
        <main style={{ flex: 1, padding: 36 }}>
          {view === "inicio" && (
            <Card>
              <h2 style={{ color: "#1976d2" }}>Inicio</h2>
              <ul style={{ lineHeight: 2 }}>
                <li>Nosotros</li>
                <li>Áreas de Trabajo</li>
                <li>Calidad en el Servicio</li>
              </ul>
            </Card>
          )}

          {view === "registrarPaciente" && role === "admin" && (
            <Card>
              <h2 style={{ color: "#1976d2", marginBottom: 20 }}>
                Registrar Paciente
              </h2>

              <Input placeholder="Nombres" />
              <Input placeholder="Apellidos" />

              <select
                onChange={(e) => setTipoDocumento(e.target.value)}
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 14,
                  borderRadius: 4,
                  border: "1px solid #90caf9"
                }}
              >
                <option value="">Tipo de documento</option>
                <option>Cédula de Ciudadanía</option>
                <option>Tarjeta de Identidad</option>
                <option>Cédula de Extranjería</option>
                <option>Pasaporte</option>
                <option>Registro Civil</option>
                <option>No. Único de Identificación Personal</option>
                <option>Adulto sin Identificación</option>
                <option>Menor sin Identificación</option>
                <option>Carnet Diplomático</option>
                <option>Certificado Nacido Vivo</option>
                <option>Salvo Conducto</option>
                <option>Permiso Especial Permanencia</option>
                <option>Permiso por Protección Temporal</option>
              </select>

              {tipoDocumento && (
                <Input type="number" placeholder="Número de documento" />
              )}

              <Input type="date" />
              <Input placeholder="Correo Electrónico" />
              <Input placeholder="Teléfono" />
              <Input placeholder="Número Celular" />
              <Input placeholder="Ciudad de Residencia" />
              <Input placeholder="Localidad" />
              <Input placeholder="Barrio" />
              <Input placeholder="Dirección" />
              <Input placeholder="Contacto de Emergencia" />

              <select
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 20,
                  borderRadius: 4,
                  border: "1px solid #90caf9"
                }}
              >
                <option value="">Parentesco</option>
                <option>Madre</option>
                <option>Padre</option>
                <option>Hermano(a)</option>
                <option>Esposo(a)</option>
                <option>Abuelo(a)</option>
                <option>Tío(a)</option>
                <option>Primo(a)</option>
                <option>Sobrino(a)</option>
                <option>Cuñado(a)</option>
              </select>

              <Button label="Registrar Paciente" />
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}