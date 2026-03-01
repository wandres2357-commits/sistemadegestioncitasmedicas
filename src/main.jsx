import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { getSession } from "./auth";

function Root() {
  const [page, setPage] = useState("public");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = getSession();
    if (session) {
      setUser(session);
      setPage("dashboard");
    }
  }, []);

  if (page === "login") {
    return <Login onSuccess={(u) => {
      setUser(u);
      setPage("dashboard");
    }} />;
  }

  if (page === "dashboard" && user) {
    return <Dashboard user={user} onLogout={() => {
      setUser(null);
      setPage("public");
    }} />;
  }

  return (
    <>
      <App />
      <button
        onClick={() => setPage("login")}
        style={{ position: "fixed", top: 20, right: 20 }}
      >
        Iniciar sesión
      </button>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);