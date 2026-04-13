import api from "../api/axios";

export const register = async (name, email, password) => {
  const res = await api.post("/auth/register", { name, email, password });
  return res.data;
};

export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const logout = () => {
  // UPDATED: Also remove email to match utils/auth.js
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
};