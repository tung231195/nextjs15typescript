"use client";

import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { resetPasswordService } from "@/app/services/authService";

type FormData = {
  password: string;
};

export default function ResetPasswordPage() {
  const params = useParams<{ token: string }>();
  const router = useRouter();

  const token = params.token;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<"success" | "error" | undefined>();

  const onSubmit = async ({ password }: FormData) => {
    try {
      await resetPasswordService({ token, password });
      setType("success");
      setMessage("Reset password successfully");
      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      console.error(error);
      setType("error");
      setMessage("Something went wrong");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: 350, p: 4, boxShadow: 2, borderRadius: 2 }}
      >
        <Typography variant="h5" mb={3} textAlign="center">
          Reset Password
        </Typography>

        <TextField
          label="New Password"
          type="password"
          fullWidth
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{ mb: 2 }}
        />

        <Button variant="contained" fullWidth type="submit" sx={{ py: 1.2 }}>
          Reset Password
        </Button>

        {message && type && (
          <Alert severity={type} sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
      </Box>
    </Box>
  );
}
