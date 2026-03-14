import { useEffect, useState } from "react";
import App from "./App";
import Login from "./Login";

export default function AuthWrapper() {
  const [ready, setReady] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  const sync = () => {
    const token = localStorage.getItem("token") ||
                  (JSON.parse(localStorage.getItem("session") || "null")?.token);
    setHasSession(!!token);
    setReady(true);
  };

  useEffect(() => {
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("auth:updated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("auth:updated", sync);
    };
  }, []);

  if (!ready) return null;

  if (!hasSession) {
    return (
      <Login
        onSuccess={() => {
          // NO redirigir por URL
          // App.jsx ya hará setView("admin") con su useEffect
          window.dispatchEvent(new Event("auth:updated"));
        }}
      />
    );
  }

  return <App />;
}
