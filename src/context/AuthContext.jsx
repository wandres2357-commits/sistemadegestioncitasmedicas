import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  // Cargar usuario guardado
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  // LOGIN
  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data); // ← esto fuerza re-render
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null); // ← esto fuerza re-render
  };

  const value = {
    user,
    role: user?.role,
    isLogged: !!user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}