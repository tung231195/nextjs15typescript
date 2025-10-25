"use client";

import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function DownloadQR() {
  const ref = useRef<HTMLCanvasElement>(null);

  const downloadQR = () => {
    const canvas = ref.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h3>📥 Download QR Code</h3>
      <QRCodeCanvas ref={ref} value="https://nextjs.org" size={200} />
      <div>
        <button
          onClick={downloadQR}
          style={{
            marginTop: 10,
            padding: "6px 12px",
            background: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: 4,
          }}
        >
          Download PNG
        </button>
      </div>
    </div>
  );
}
