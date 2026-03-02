
import { useState } from "react";

export default function AdminDashboard() {
  const [view, setView] = useState("inicioAdmin");

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

  // <-- Corregido: propagamos onClick y demás props
  const Button = ({ label, ...props }) => (
    <button
      {...props}
      style={{
        padding: "10px 20px",
        border: "none",
        borderRadius: 4,
        background: "#2e7d32",
        color: "#fff",
        fontWeight: "bold",
        cursor: "pointer",
        ...(props.style || {})
      }}
    >
      {label}
    </button>
  );

  return (
    <div>
      {view === "inicioAdmin" && (
        <Card>
          <h2 style={{ color: "#1976d2" }}>Dashboard Administrador</h2>
          <p>Bienvenido al panel de administración.</p>

          <Button
            label="Registrar Paciente"
            onClick={() => setView("registrarPaciente")}
          />
        </Card>
      )}

      {view === "registrarPaciente" && (
        <Card>
          <h2 style={{ color: "#1976d2" }}>Registrar Paciente</h2>

          <Input placeholder="Nombres" />
          <Input placeholder="Apellidos" />
          <Input type="date" />
          <Input placeholder="Correo" />
          <Input placeholder="Teléfono" />

          <Button label="Guardar Paciente" />
        </Card>
      )}
    </div>
  );
}