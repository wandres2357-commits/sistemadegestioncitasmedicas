
// src/FooterSitemap.jsx
import { useState } from "react";
import "./footer-sitemap.css";

/**
 * items = [
 *  {
 *    title: "¿Quiénes Somos?",
 *    key: "quienes",
 *    links: [
 *      { label: "Historia", view: "historia" },
 *      { label: "Misión", view: "mision" },
 *      ...
 *    ]
 *  },
 *  ...
 * ]
 */

export default function FooterSitemap({ items = [], onNavigate }) {
  const [open, setOpen] = useState(null);

  const toggle = (key) => setOpen(open === key ? null : key);

  return (
    <footer className="fs-footer">
      <div className="fs-inner">
        {/* Cabecera opcional */}
        <div className="fs-header">
          <div className="fs-brand">
            <svg className="fs-logo" viewBox="0 0 48 48" aria-hidden="true">
              <defs>
                <linearGradient id="fsG" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#1976d2" />
                  <stop offset="1" stopColor="#42a5f5" />
                </linearGradient>
              </defs>
              <circle cx="24" cy="24" r="22" fill="url(#fsG)" />
              <rect x="21" y="10" width="6" height="28" rx="3" fill="#fff" />
              <rect x="10" y="21" width="28" height="6" rx="3" fill="#fff" />
            </svg>
            <div>
              <div className="fs-title">SGCM — Mapa del sitio</div>
              <div className="fs-sub">Navegación rápida</div>
            </div>
          </div>
        </div>

        {/* Grid de columnas */}
        <div className="fs-grid">
          {items.map((col) => (
            <div key={col.key} className="fs-col">
              {/* Título con despliegue (en móvil actúa como acordeón) */}
              <button
                className={`fs-col-title ${open === col.key ? "is-open" : ""}`}
                onClick={() => toggle(col.key)}
                aria-expanded={open === col.key}
                aria-controls={`panel-${col.key}`}
              >
                {col.title}
                <span className="fs-arrow" aria-hidden="true">▾</span>
              </button>

              <ul
                id={`panel-${col.key}`}
                className={`fs-list ${open === col.key ? "is-open" : ""}`}
              >
                {col.links.map((lnk, i) => (
                  <li key={`${col.key}-${i}`} className="fs-item">
                    <button
                      className="fs-link"
                      onClick={() => onNavigate?.(lnk.view)}
                      title={lnk.label}
                    >
                      <span className="fs-bullet" aria-hidden="true">•</span>
                      <span>{lnk.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Línea inferior / copyright opcional */}
        <div className="fs-bottom">
          <small>© {new Date().getFullYear()} SGCM. Todos los derechos reservados.</small>
        </div>
      </div>
    </footer>
  );
}