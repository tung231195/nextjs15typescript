"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button } from "@mui/material";
import CustomTextField from "@/app/components/custom/CustomTextField";
import { registerService } from "@/app/services/authService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const route = useRouter();
  type FormData = {
    name: string;
    password: string;
    email: string;
  };
  const schema = yup.object().shape({
    name: yup.string().required("The name is required"),
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
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const user = await registerService(data);
    if (user) toast.success("You have register succesfully");
    route.push("/login");
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
          width: "30%",
          border: "1px solid #ccc",
          boxShadow: " 5px 5px 10px 2px rgba(0, 0, 0, 0.3)",
          padding: "20px",
          height: "auto",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomTextField<FormData>
            name="name"
            label="Name"
            variant="outlined"
            error={!!errors.email}
            fullWidth
            control={control}
          />
          <CustomTextField<FormData>
            name="email"
            label="Email"
            variant="outlined"
            error={!!errors.email}
            fullWidth
            control={control}
          />
          <CustomTextField<FormData>
            name="password"
            type="password"
            label="Mật khẩu"
            variant="outlined"
            fullWidth
            control={control}
          />
          <Button fullWidth sx={{ mt: 2, float: "right" }} type="submit" variant="contained">
            Register
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

export default RegisterForm;
