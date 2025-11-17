"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { TParamsLogin, User } from "../types";
import { loginService } from "../services/authService";
import { useRouter } from "next/navigation";

type AuthContextProp = {
  isLogin: boolean;
  isLoading: boolean;
  login: (data: TParamsLogin) => Promise<{ status: string; message: string }>;
  logout: () => void;
  user: User | undefined;

  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextProp>({
  isLogin: false,
  login: async () => ({ status: "error", message: "" }),
  logout: () => {},
  user: { _id: "", name: "", email: "", role: "user" },
  setUser: () => {}, // ✅ hàm rỗng placeholder
  setIsLogin: () => {},
  isLoading: true,
});

const AuthConextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();
  const router = useRouter();
  useEffect(() => {
    let isMounted = true;
    if (typeof window === "undefined") return;
    const userData = localStorage.getItem("user");
    if (userData && isMounted) {
      try {
        const parsed = JSON.parse(userData) as User;
        setUser(parsed);
        setIsLoading(false);
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      setUser(undefined);
      setIsLogin(false);
      router.push("/login");
    };

    window.addEventListener("logout", handleLogout);

    return () => window.removeEventListener("logout", handleLogout);
  }, [router, user]);

  const login = async (data: TParamsLogin): Promise<{ status: string; message: string }> => {
    try {
      const res = await loginService(data);
      setUser(res.user);
      setIsLogin(true);
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      setIsLoading(false);
      return { status: res.status, message: res.message };
    } catch (e: unknown) {
      console.log(e);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return { status: "error", message: "the wrong username or password" };
    }
  };
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(undefined);
    setIsLogin(false);
    try {
      router.push("/login");
    } catch (err) {
      console.error(err);
      // fallback
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider value={{ isLogin, isLoading, login, user, logout, setUser, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};
export { AuthConextProvider, useAuthContext };
