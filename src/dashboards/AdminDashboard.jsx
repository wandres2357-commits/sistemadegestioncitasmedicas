
// src/dashboards/AdminDashboard.jsx
import { useState } from "react";
import "./admin.css";

export default function AdminDashboard() {
  const [view, setView] = useState("inicioAdmin");

  const Card = ({ children }) => <div className="admin-card">{children}</div>;
  const Input = (props) => <input {...props} className="admin-input" />;
  const Button = ({ label, ...props }) => (
    <button {...props} className="admin-cta" style={props.style}>
      {label}
    </button>
  );

  return (
    <div>
      {view === "inicioAdmin" && (
        <Card>
          <h2>Administrador del panel de control</h2>
          <p>Bienvenido al panel de administración.</p>

          <Button
            label="Registrar Paciente"
            onClick={() => setView("registrarPaciente")}
          />
        </Card>
      )}

      {view === "registrarPaciente" && (
        <Card>
          <h2>Registrar Paciente</h2>

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