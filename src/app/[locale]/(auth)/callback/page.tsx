"use client";

import { Suspense } from "react";
import CallbackPageClient from "./CallbackClient";

export default function CallbackPage() {
  return (
    <Suspense fallback={<p>Đang xử lý đăng nhập...</p>}>
      <CallbackPageClient />
    </Suspense>
  );
}
