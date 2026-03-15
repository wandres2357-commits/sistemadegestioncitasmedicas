import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  const login = (sessionData) => {
    localStorage.setItem("session", JSON.stringify(sessionData));
    localStorage.setItem("token", sessionData.token);
    localStorage.setItem("role", sessionData.role);

    setUser(sessionData);
  };

  const logout = () => {
    localStorage.removeItem("session");
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogged: !!user,
        role: user?.role,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}