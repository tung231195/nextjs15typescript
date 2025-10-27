import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function CallbackPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");
    const name = searchParams.get("name");

    if (token) {
      // 👉 Lưu JWT vào localStorage (hoặc cookie HTTP-only)
      localStorage.setItem("accessToken", token);
      console.log("✅ Logged in as:", name);
      // Điều hướng về trang chủ
      router.push("/");
    }
  }, [searchParams, router]);

  return <p>Đang xử lý đăng nhập Facebook...</p>;
}
