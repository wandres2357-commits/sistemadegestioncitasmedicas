export default function Header({ view, setView }) {
  return (
    <header className="topbar" role="banner">
      <div className="topbar-inner">

        <div className="brand">
          <div>
            <div className="brand-title">
              SGCM – Sistema de Gestión de Citas Médicas
            </div>
            <div className="brand-sub">
              Salud • Calidad • Confianza
            </div>
          </div>
        </div>

        <ul className="menu">

          <li>
            <button
              className={`link ${view === "inicio" ? "active" : ""}`}
              onClick={() => setView("inicio")}
            >
              Inicio
            </button>
          </li>

          <li>
            <button className="link">¿Quiénes Somos?</button>

            <div className="dropdown">
              <button onClick={() => setView("historia")}>Historia</button>
              <button onClick={() => setView("mision")}>Misión</button>
              <button onClick={() => setView("vision")}>Visión</button>
              <button onClick={() => setView("politica")}>Política de Calidad</button>
              <button onClick={() => setView("info")}>Información Institucional</button>
            </div>
          </li>

        </ul>

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
  );
}