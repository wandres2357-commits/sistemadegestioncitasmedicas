import { useState } from "react";
import { saveSession } from "./auth";
// ✅ Usamos componentes UI con Tailwind
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";

// ❌ Ya no usamos el CSS antiguo del login
// import "./login.css";

export default function Login({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      saveSession(data);
      onSuccess(data);
    } catch {
      setError("Usuario o contraseña incorrecta");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") login();
  };

  return (
    <div className="min-h-dvh flex items-center justify-center px-4 bg-slate-50">
      <Card className="w-full max-w-sm">
        <h2 className="text-center text-2xl font-bold text-blue-700 mb-5">
          Iniciar sesión
        </h2>

        <div className="space-y-3">
          {/* Usuario */}
          <Input
            type="text"
            name="username"
            placeholder="Usuario"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {/* Password con toggle accesible */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pr-12" /* espacio para el botón de ojo */
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-9 h-9 rounded-md border border-slate-300 text-slate-500 hover:text-blue-600 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              aria-pressed={showPassword}
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Error accesible */}
          {error && (
            <p
              className="text-red-600 text-sm text-center -mt-1 mb-1"
              role="alert"
              aria-live="polite"
            >
              {error}
            </p>
          )}

          {/* Botón principal */}
          <Button className="w-full" variant="primary" onClick={login} disabled={loading}>
            {loading ? "Iniciando sesión..." : "Entrar"}
          </Button>

          {/* Spinner de carga */}
          {loading && (
            <div className="mt-3 flex justify-center" aria-hidden="true">
              <svg
                className="h-6 w-6 animate-spin text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                role="img"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}