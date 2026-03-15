// src/components/ui/Card.jsx
export default function Card({ className = "", children }) {
  const base = "bg-white rounded-xl shadow-md p-6";
  return <div className={`${base} ${className}`}>{children}</div>;
}
