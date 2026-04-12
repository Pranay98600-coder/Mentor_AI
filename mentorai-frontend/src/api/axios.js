import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Attach JWT token if present (exclude auth endpoints)
api.interceptors.request.use(
  (config) => {
    // Don't add token to auth endpoints (register, login)
    const isAuthEndpoint = config.url?.includes("/auth/");

    if (!isAuthEndpoint) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;