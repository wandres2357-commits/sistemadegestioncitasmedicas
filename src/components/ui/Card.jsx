// src/components/ui/Card.jsx
export default function Card({ className = "", children }) {
  const base = "bg-brand-surface rounded-[14px] shadow-card p-6";
  return <div className={`${base} ${className}`}>{children}</div>;
}
``