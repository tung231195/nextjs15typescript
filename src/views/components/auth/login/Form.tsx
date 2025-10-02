"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button } from "@mui/material";
import CustomTextField from "@/app/components/custom/CustomTextField";
import { useAuthContext } from "@/app/context/AuthContext";
import { TParamsLogin } from "@/app/types";
import { useRouter } from "next/navigation";

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
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /** context  */
  const { login, isLogin } = useAuthContext();

  const onSubmit = async (data: TParamsLogin) => {
    console.log("data submit", data);
    await login(data);
    if (isLogin) {
      route.push("/");
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
          <Button fullWidth sx={{ mt: 2, float: "right" }} type="submit" variant="contained">
            Login
          </Button>
          <Button fullWidth sx={{ mt: 2, float: "right" }} variant="outlined">
            Login with google
          </Button>
          <Button fullWidth sx={{ mt: 2, float: "right" }} type="submit" variant="outlined">
            Login with facebook
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
