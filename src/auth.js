export const saveSession = (data) => {
  localStorage.setItem("session", JSON.stringify(data));
};

export const getSession = () => {
  return JSON.parse(localStorage.getItem("session"));
};

export const logout = () => {
  localStorage.removeItem("session");
};