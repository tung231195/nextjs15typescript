"use client";

import { googleService } from "@/app/services/authService";
import { Box } from "@mui/material";
import { useEffect } from "react";

type GoogleCredentialResponse = {
  clientId: string;
  credential: string;
  select_by: string;
};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "large" | "medium" | "small";
              text?: "signin_with" | "signup_with" | "continue_with" | "signin";
              shape?: "rectangular" | "pill" | "circle" | "square";
            },
          ) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export default function GoogleLoginButton() {
  const handleCredentialResponse = async (response: GoogleCredentialResponse) => {
    console.log("✅ Google token:", response.credential);
    const googleToken = response.credential;
    const res = await googleService(googleToken);
    console.log("response google", res);
  };

  useEffect(() => {
    const initialize = () => {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      if (!clientId) {
        console.error("❌ Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID");
        return;
      }

      window.google?.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
      });

      const btn = document.getElementById("googleBtn");
      if (btn) {
        window.google?.accounts.id.renderButton(btn, {
          theme: "outline",
          size: "large",
          text: "signin_with",
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

  return <Box sx={{ mt: 2 }} id="googleBtn"></Box>;
}
