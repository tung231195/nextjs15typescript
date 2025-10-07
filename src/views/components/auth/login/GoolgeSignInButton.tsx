"use client";

import { googleService } from "@/app/services/authService";
import { Box } from "@mui/material";
import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleLoginButton() {
  useEffect(() => {
    const initialize = () => {
      if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
        console.error("❌ Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID");
        return;
      }

      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      // render button vào div#googleBtn
      const btn = document.getElementById("googleBtn");
      if (btn) {
        window.google.accounts.id.renderButton(btn, {
          theme: "outline",
          size: "large",
          text: "signin_with", // hoặc "continue_with"
          shape: "rectangular",
        });
      }
    };

    if (window.google) {
      initialize();
    } else {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.onload = initialize;
      document.body.appendChild(script);
    }
  }, []);

  const handleCredentialResponse = async (response: any) => {
    console.log("✅ Google token:", response.credential);
    const googleToken = response.credential;
    const res = await googleService(googleToken);
    console.log("response google", res);
  };

  return <Box sx={{ mt: 2 }} id="googleBtn"></Box>;
}
