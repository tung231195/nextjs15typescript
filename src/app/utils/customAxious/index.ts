import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { refreshTokenService } from "@/app/services/authService";

// ✅ Tạo instance axios riêng
const customAxios = axios.create({
  baseURL:
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api` || "https://nodejs2015typescript.onrender.com/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// ✅ Request interceptor (thêm token và xử lý refresh)
customAxios.interceptors.request.use(
  async (config) => {
    if (typeof window === "undefined") return config;

    let token = localStorage.getItem("accessToken");
    const isLoginPage = window.location.pathname.includes("/login");
    if (!token || isLoginPage) return config;
    try {
      const decoded: { exp?: number } = jwtDecode(token);
      const now = Date.now();
      if (decoded.exp && now >= decoded.exp * 1000) {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          // ✅ Gọi API refresh token
          const newToken = await refreshTokenService(refreshToken);

          if (newToken) {
            localStorage.setItem("accessToken", newToken);
            token = newToken;
          }
        }
      }
    } catch (error) {
      console.error("❌ Lỗi decode hoặc refresh token:", error);
    }

    // ✅ Gắn token vào header Authorization
    if (config.headers && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ✅ Response interceptor (bắt lỗi 401)
customAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(
      "token [Response Interceptor] Status:",
      error.response?.status,
      "URL:",
      error.config?.url,
    );
    if (error.response?.status === 401) {
      //console.error("⚠️ Unauthorized! Có thể token hết hạn hoặc không hợp lệ.");
      // Thông báo lỗi, trigger event / callback
      window.dispatchEvent(new Event("logout"));
    }
    return Promise.reject(error);
  },
);

export default customAxios;
