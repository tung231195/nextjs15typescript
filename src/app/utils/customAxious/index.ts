import axios from "axios";

// Tạo instance
const customAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_customAxios_URL || "http://localhost:5000/api",
  timeout: 10000, // 10s
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (gắn token nếu có)
customAxios.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
customAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirect to login.");
      // localStorage.removeItem("accessToken");
      // localStorage.removeItem("user");
    }
    return Promise.reject(error);
  },
);

export default customAxios;
