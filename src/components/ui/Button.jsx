
// src/components/ui/Button.jsx
export default function Button({
  children,
  variant = "primary", // primary | danger | ghost
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-11";

  const variants = {
    primary:
      "px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
    danger:
      "px-4 py-2 bg-red-600 text-white hover:bg-red-700 shadow-sm",
    ghost:
      "px-3 py-2 border border-slate-300 text-slate-800 hover:bg-slate-50",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
