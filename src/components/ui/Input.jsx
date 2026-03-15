// src/components/ui/Input.jsx
export default function Input({ className = "", ...props }) {
  const base =
    "w-full rounded-lg border border-brand-border bg-white p-3 text-brand-text " +
    "placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]";
  return <input className={`${base} ${className}`} {...props} />;
}