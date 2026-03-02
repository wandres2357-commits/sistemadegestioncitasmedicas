// auth.js
export const saveSession = (data) => {
  localStorage.setItem("session", JSON.stringify(data));
  const token = data?.token;
  const role = (data?.role || data?.rol || "").toLowerCase();
  if (token) localStorage.setItem("token", token);
  if (role)  localStorage.setItem("role", role);
  window.dispatchEvent(new Event("auth:updated"));
};

export const getSession = () => {
  try {
    const raw = localStorage.getItem("session");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("session");
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.dispatchEvent(new Event("auth:updated"));
};
``