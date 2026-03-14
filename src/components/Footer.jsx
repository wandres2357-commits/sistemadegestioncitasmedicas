export default function Footer({ items, onNavigate }) {
  return (
    <footer className="footer">

      <div className="footer-container">
        <h3 className="footer-title">Mapa del Sitio</h3>

        <div className="footer-grid">
          {items.map((section) => (
            <div key={section.key} className="footer-section">

              <h4>{section.title}</h4>

              <ul>
                {section.links.map((link, index) => (
                  <li key={index}>
                    <button
                      className="footer-link"
                      onClick={() => onNavigate(link.view)}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} SGCM – Sistema de Gestión de Citas Médicas
        </p>
      </div>

    </footer>
  );
}