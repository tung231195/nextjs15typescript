"use client";
import { useAuthContext } from "@/app/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect } from "react";

export default function CallbackPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setUser, setIsLogin } = useAuthContext();
  useEffect(() => {
    const token = searchParams.get("token");
    const name = searchParams.get("name") ?? "";
    const email = searchParams.get("email") ?? "";
    const _id = searchParams.get("_id") ?? "";
    if (token) {
      localStorage.setItem("user", JSON.stringify({ _id, name, email }));
      localStorage.setItem("accessToken", token);
      setUser({ _id, name, email, role: "user" });
      setIsLogin(true);
      router.push("/");
    }
  }, [searchParams, router, setUser, setIsLogin]);

  return <p>Đang xử lý đăng nhập Facebook...</p>;
}
