"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

// 👉 Hàm khởi tạo socket (singleton)
const getSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000", {
      transports: ["websocket"],
      autoConnect: false, // tránh kết nối sớm
    });
  }
  return socket;
};

// ✅ Hook chính
export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const s = getSocket();
    socketRef.current = s;

    // Kết nối socket
    if (!s.connected) s.connect();

    // Lắng nghe trạng thái
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    s.on("connect", onConnect);
    s.on("disconnect", onDisconnect);

    return () => {
      s.off("connect", onConnect);
      s.off("disconnect", onDisconnect);
      // ❗Không nên gọi s.disconnect() ở đây
      // để giữ kết nối khi đổi trang
    };
  }, []);

  // Tiện ích gửi event
  const emitEvent = (event: string, data?: any) => {
    socketRef.current?.emit(event, data);
  };

  // Tiện ích lắng nghe event
  const onEvent = (event: string, callback: (...args: any[]) => void) => {
    socketRef.current?.on(event, callback);
    return () => socketRef.current?.off(event, callback);
  };

  return {
    socket: socketRef.current,
    isConnected,
    emitEvent,
    onEvent,
  };
};
