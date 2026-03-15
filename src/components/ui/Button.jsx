// src/components/ui/Button.jsx
export default function Button({
  children,
  variant = "primary", // primary | danger | ghost
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-md font-semibold transition-colors " +
    "focus:outline-none focus:ring-2 min-h-11 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary:
      // usa tu color de marca
      "px-4 py-2 bg-brand-primary text-white hover:bg-[color-mix(in_oklab,var(--primary),#000_12%)] " +
      "focus:ring-[color:var(--primary-2)] shadow-sm",
    danger:
      "px-4 py-2 bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm",
    ghost:
      "px-3 py-2 border border-brand-border text-brand-text hover:bg-slate-50",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}