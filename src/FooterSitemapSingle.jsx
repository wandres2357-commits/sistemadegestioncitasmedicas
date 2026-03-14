// src/FooterSitemapSingle.jsx
import { useState } from "react";
import "./footer-sitemap-single.css";

export default function FooterSitemapSingle({ items = [], onNavigate }) {
  const [open, setOpen] = useState(null);

  const toggle = (key) => setOpen(open === key ? null : key);

  return (
    <footer className="fs1-footer">
      <div className="fs1-inner">
        {/* Cabecera */}
        <div className="fs1-header">
          <div className="fs1-brand">
            <svg className="fs1-logo" viewBox="0 0 48 48" aria-hidden="true">
              <defs>
                <linearGradient id="fs1G" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#1976d2" />
                  <stop offset="1" stopColor="#42a5f5" />
                </linearGradient>
              </defs>
              <circle cx="24" cy="24" r="22" fill="url(#fs1G)" />
              <rect x="21" y="10" width="6" height="28" rx="3" fill="#fff" />
              <rect x="10" y="21" width="28" height="6" rx="3" fill="#fff" />
            </svg>
            <div>
              <div className="fs1-title">SGCM — Mapa del sitio</div>
              <div className="fs1-sub">Navegación rápida</div>
            </div>
          </div>
        </div>

        {/* Lista única */}
        <div className="fs1-list-wrap">
          <ul className="fs1-list" role="list">
            {items.map((group) => (
              <li key={group.key} className="fs1-group">
                {/* Encabezado del grupo */}
                <button
                  className={`fs1-group-title ${open === group.key ? "is-open" : ""}`}
                  onClick={() => toggle(group.key)}
                  aria-expanded={open === group.key}
                  aria-controls={`panel-${group.key}`}
                >
                  {group.title}
                  <span className="fs1-arrow" aria-hidden="true">▾</span>
                </button>

                <ul
                  id={`panel-${group.key}`}
                  className={`fs1-sublist ${open === group.key ? "is-open" : ""}`}
                  role="list"
                >
                  {group.links.map((lnk, i) => (
                    <li key={`${group.key}-${i}`} className="fs1-item">
                      <button
                        className="fs1-link"
                        onClick={() => onNavigate?.(lnk.view)}
                        title={lnk.label}
                      >
                        <span className="fs1-bullet" aria-hidden="true">•</span>
                        <span>{lnk.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <div className="fs1-bottom">
          <small>© {new Date().getFullYear()} SGCM. Todos los derechos reservados.</small>
        </div>
      </div>
    </footer>
  );
}