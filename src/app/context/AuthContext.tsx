"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { TParamsLogin, User } from "../types";
import { loginService } from "../services/authService";

type AuthContextProp = {
  isLogin: boolean;
  login: (data: TParamsLogin) => Promise<void>;
  user: User | undefined;
};

const AuthContext = createContext<AuthContextProp>({
  isLogin: false,
  login: async () => {},
  user: { _id: "", name: "", email: "" },
});

const AuthConextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    let isMounted = true;
    if (typeof window === "undefined") return;
    const userData = localStorage.getItem("user");
    if (userData && isMounted) {
      try {
        const parsed = JSON.parse(userData) as User;
        setUser(parsed);
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (data: TParamsLogin) => {
    try {
      const res = await loginService(data);
      console.log("data login", res);
      setIsLogin(true);
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("accessToken", res.accessToken);
    } catch (e: unknown) {
      localStorage.removeItem("user");
      localStorage.re("accessToken");
      console.log(e);
    }
  };
  return <AuthContext.Provider value={{ isLogin, login, user }}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  return useContext(AuthContext);
};
export { AuthConextProvider, useAuthContext };
