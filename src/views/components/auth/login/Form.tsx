"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Typography } from "@mui/material";
import CustomTextField from "@/app/components/custom/CustomTextField";
import { useAuthContext } from "@/app/context/AuthContext";
import { TParamsLogin } from "@/app/types";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "./GoolgeSignInButton";
import FacebookLoginButton from "./FacebookLoginButton";
import Link from "next/link";

const LoginForm = () => {
  type FormData = {
    password: string;
    email: string;
  };
  const route = useRouter();
  const schema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().required("The Password is required"),
  });
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /** context  */
  const { login } = useAuthContext();

  const onSubmit = async (data: TParamsLogin) => {
    const res = await login(data);
    if (res.status !== "error") {
      route.push("/");
    } else {
      setError("email", {
        type: "manual",
        message: res.message || "Email hoặc mật khẩu không đúng",
      });
      setError("password", {
        type: "manual",
        message: res.message || "Email hoặc mật khẩu không đúng",
      });
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomTextField<FormData>
            name="email"
            label="Email"
            variant="outlined"
            error={!!errors.email}
            fullWidth
            control={control}
            autoComplete="current-email"
          />
          <CustomTextField<FormData>
            name="password"
            type="password"
            label="Mật khẩu"
            variant="outlined"
            fullWidth
            control={control}
            autoComplete="current-password"
          />
          <Button fullWidth sx={{ mt: 2 }} type="submit" variant="contained">
            Login
          </Button>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Typography variant="caption" sx={{ color: "warning.main" }}>
              If you forgot the password, click{" "}
              <Link href="/forgot" passHref>
                <b>reset</b>
              </Link>
            </Typography>
          </Box>
          <Box>
            <GoogleLoginButton />
            <FacebookLoginButton />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" sx={{ color: "warning.main" }}>
              If you dont have an account, click{" "}
              <Link href="/register" passHref>
                <b>register</b>
              </Link>{" "}
              to create it.
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
