"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, CircularProgress, Divider, Typography } from "@mui/material";
import { useAuthContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/app/services/userService";
import { useUpdateUserMutation } from "@/app/hooks/useOrderMutation";
import { CustomerType } from "@/app/types";
import CustomTextField2 from "@/app/components/custom/CustomTextField2";
import CustomSelectField from "@/app/components/custom/CustomSelectField";

type TPropCustomerForm = {
  handleClose: () => void;
  openUserModal: { open: boolean; id: string };
};
type TOptions = {
  label: string;
  value: string;
};
const roleOptions: TOptions[] = [
  { label: "user", value: "user" },
  { label: "admin", value: "admin" },
  { label: "superadmin", value: "superadmin" },
];
const CustomerForm = (props: TPropCustomerForm) => {
  const updateUser = useUpdateUserMutation();
  const router = useRouter();
  const { handleClose, openUserModal } = props;

  const schema = yup.object().shape({
    name: yup.string().required("The Title is required"),
    email: yup.string().required("The Content is required"),
    status: yup
      .mixed<"enable" | "disabled">()
      .oneOf(["enable", "disabled"])
      .required("The Content is required"),
    role: yup
      .mixed<"user" | "admin" | "superadmin">()
      .oneOf(["user", "admin", "superadmin"])
      .required("the role is required"),
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerType>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      status: "disabled",
      role: "user",
    },
  });

  /** context  */
  const { user } = useAuthContext();

  const onSubmit = async (data: CustomerType) => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (openUserModal.id) {
      updateUser.mutate({
        customerId: openUserModal.id,
        data,
      });
      toast.success("Update Succesfully");
    } else {
      toast.success("Add New  Succesfully");
    }
    handleClose();
  };

  // 🔹 Lấy user detail
  const {
    data: customer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["customer", openUserModal.id],
    queryFn: () => getUserById(openUserModal.id as string),
    enabled: !!openUserModal.id,
  });

  useEffect(() => {
    if (customer && openUserModal.id) {
      reset({
        name: customer?.name,
        email: customer?.email,
        role: customer?.role,
        status: customer?.status ?? "disabled",
      });
    } else {
      reset({
        name: "",
        email: "",
        role: "user",
        status: "disabled",
      });
    }
  }, [openUserModal.id, customer]);

  if (isLoading) return <CircularProgress />;
  if (isError) {
    toast.error("Failed to load user");
    return null;
  }
  return (
    <Box>
      <Box>
        <Typography variant="h5">Update Customer</Typography>
        <Typography variant="body1">
          Update your Customer necessary information from here
        </Typography>
      </Box>
      <Divider sx={{ padding: "10px 0" }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mt: 4 }}>
          <CustomTextField2<CustomerType>
            name="name"
            label="Name"
            variant="outlined"
            error={!!errors.name}
            fullWidth
            control={control}
          />
          <CustomTextField2<CustomerType>
            name="email"
            label="Email"
            variant="outlined"
            error={!!errors.email}
            fullWidth
            control={control}
          />
          <CustomSelectField<CustomerType>
            name="role"
            control={control}
            options={roleOptions}
            label={"Role"}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            p: 2,
            bgcolor: "background.paper",
            borderTop: "1px solid #e0e0e0",
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Button onClick={handleClose} color="warning" variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {openUserModal?.id ? "Update" : "Add New"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CustomerForm;
