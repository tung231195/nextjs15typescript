"use client";
import React, { useRef, useState } from "react";

export default function FetchOnceExample() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);

  const fetchData = async () => {
    // Nếu đang loading, return ngay
    if (loadingRef.current) {
      console.warn("🚫 Đang gọi API, chờ xíu...");
      return;
    }

    // Set ref ngay lập tức, trước bất kỳ await nào
    loadingRef.current = true;
    setLoading(true);

    try {
      console.log("🔄 Gọi API...");
      const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      const json = await res.json();
      console.log("✅ Thành công");
      setData(json);
    } catch (err) {
      console.error("❌ Lỗi:", err);
    } finally {
      // reset lại ref khi xong
      loadingRef.current = false;
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <button onClick={fetchData} disabled={loading}>
        {loading ? "⏳ Đang tải..." : "Gọi API"}
      </button>
      {data && (
        <pre style={{ marginTop: 12, textAlign: "left" }}>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
