import { logout } from "./auth";

export default function Dashboard({ user, onLogout }) {
  return (
    <div style={{ padding: 40 }}>
      <h1>Bienvenido {user.username}</h1>
      <p>Rol: {user.role}</p>

      {user.role === "admin" && (
        <>
          <h3>Panel Administrador</h3>
          <ul>
            <li>Gestión de Usuarios</li>
            <li>Reportes</li>
            <li>Configuración</li>
          </ul>
        </>
      )}

      {user.role === "user" && (
        <>
          <h3>Panel Usuario</h3>
          <ul>
            <li>Mis solicitudes</li>
            <li>Seguimiento PQR</li>
          </ul>
        </>
      )}

      <button onClick={() => {
        logout();
        onLogout();
      }}>
        Cerrar sesión
      </button>
    </div>
  );
}