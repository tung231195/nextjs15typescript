"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Box } from "@mui/material";
import { forgotPasswordService } from "@/app/services/authService";

type ResetFormInputs = {
  email: string;
};

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ResetFormInputs>();
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: ResetFormInputs) => {
    try {
      const res = await forgotPasswordService(data.email);

      if (!res.status) {
        // Set error cho email nếu server trả lỗi
        setError("email", { type: "manual", message: res.message || "Something went wrong" });
        return;
      }
      setSuccess(true); // thông báo success
    } catch (err) {
      console.log(err);
      setError("email", { type: "manual", message: "Server error, try again later." });
    }
  };

  return (
    <Box
      sx={{
        height: "auto",
        mt: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: {
            md: "30%",
            sm: "100%",
            xs: "100%",
          },
          border: "1px solid #ccc",
          boxShadow: " 5px 5px 10px 2px rgba(0, 0, 0, 0.3)",
          padding: "20px",
          height: "auto",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <Typography variant="h6">Reset Password</Typography>

          <TextField
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <Button type="submit" variant="contained">
            Send Reset Link
          </Button>

          {success && (
            <Typography variant="body2" color="success.main">
              Reset link sent! Check your email.
            </Typography>
          )}

          <Typography variant="caption">
            Remember your password?{" "}
            <Link href="/login" passHref>
              <b style={{ color: "blue" }}>Login</b>
            </Link>
          </Typography>
        </form>
      </Box>
    </Box>
  );
}
