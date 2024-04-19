import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_MODE === "production"
      ? import.meta.env.VITE_API_URL
      : import.meta.env.VITE_LOCAL_URL,
});

api.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  config.headers["Content-Type"] = "multipart/form-data";

  return config;
});

export default api;
