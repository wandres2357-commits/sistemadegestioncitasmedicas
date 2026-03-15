// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState, useMemo } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState(null);

  // 1) Restaurar sesión
  useEffect(() => {
    try {
      const raw = localStorage.getItem("auth");
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed.user ?? null);
        setRole(parsed.role ?? null);
        setToken(parsed.token ?? null);
        setIsLogged(Boolean(parsed.isLogged));
      }
    } catch (e) {
      console.error("Auth restore error:", e);
    } finally {
      setInitializing(false);
    }
  }, []);

  // 2) Login: espera el payload que devuelve tu backend
  const login = async (payload) => {
    // payload típico del backend: { user, role, token, ... }
    const nextUser = payload?.user ?? null;
    const nextRole = payload?.role ?? null;
    const nextToken = payload?.token ?? null;

    setUser(nextUser);
    setRole(nextRole);
    setToken(nextToken);
    setIsLogged(true);

    localStorage.setItem(
      "auth",
      JSON.stringify({
        user: nextUser,
        role: nextRole,
        token: nextToken,
        isLogged: true,
      })
    );
  };

  // 3) Logout
  const logout = () => {
    setUser(null);
    setRole(null);
    setToken(null);
    setIsLogged(false);
    localStorage.removeItem("auth");
  };

  const value = useMemo(
    () => ({ user, role, token, isLogged, initializing, login, logout }),
    [user, role, token, isLogged, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
