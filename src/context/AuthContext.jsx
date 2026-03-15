import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (data) => {

    localStorage.setItem("user", JSON.stringify(data));

    setUser(data); // 👈 ESTO ES LO QUE ACTUALIZA REACT
  };

  const logout = () => {

    localStorage.removeItem("user");

    setUser(null); // 👈 ESTO DISPARA EL RENDER
  };

  const role = user?.role || null;
  const isLogged = !!user;

  return (
    <AuthContext.Provider value={{ user, role, isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);