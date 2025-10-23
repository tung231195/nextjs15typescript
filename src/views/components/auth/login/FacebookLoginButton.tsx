"use client";

import { Button } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function FacebookLoginButton() {
  const handleLogin = () => {
    const clientFBId = process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/facebook/callback`;
    const fbUrl = `${process.env.NEXT_PUBLIC_FB_URL}?client_id=${clientFBId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=email,public_profile`;
    window.location.href = fbUrl;
  };

  return (
    <Button
      fullWidth
      variant="outlined"
      startIcon={<FacebookIcon />}
      onClick={handleLogin}
      sx={{ mt: 2, textTransform: "none", color: "#1877F2", borderColor: "#1877F2" }}
    >
      Login with Facebook
    </Button>
  );
}
