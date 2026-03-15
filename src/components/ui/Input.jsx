// src/components/ui/Input.jsx
export default function Input({ className = "", ...props }) {
  const base =
    "w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 " +
    "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return <input className={`${base} ${className}`} {...props} />;
}
