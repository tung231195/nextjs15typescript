"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@mui/material";
import CustomTextField from "@/app/components/custom/CustomTextField";
import { useAuthContext } from "@/app/context/AuthContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { useCallback, useEffect, useState } from "react";
import { getPaymentMethodService } from "@/app/services/paymentMethodService";
import { PaymentMethodType } from "@/app/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CustomSelectField from "@/app/components/custom/CustomSelectField";
import { addPaymentMethod, updatePaymentMethod } from "@/app/store/actions/payment";
type TPropPaymentMethodForm = {
  handleClose: () => void;
  openModal: { open: boolean; id: string };
};
export interface IOption {
  label: string;
  value: string | number;
}
const PaymentMethodForm = (props: TPropPaymentMethodForm) => {
  const router = useRouter();
  const { handleClose, openModal } = props;
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>();
  const dispatch = useDispatch<AppDispatch>();
  type FormData = {
    method: "paypal" | "stripe" | "momo" | "cod" | "qrcode";
    status: "pending" | "paid" | "failed" | "refunded";
    amount: number;
  };

  const paymentMethods = ["paypal", "stripe", "momo", "cod", "qrcode"] as const;
  const paymentStatus = ["pending", "paid", "failed", "refunded"] as const;
  const schema = yup.object().shape({
    method: yup
      .mixed<(typeof paymentMethods)[number]>()
      .oneOf(paymentMethods, "Phương thức thanh toán không hợp lệ")
      .required("Phương thức thanh toán là bắt buộc"),
    status: yup
      .mixed<(typeof paymentStatus)[number]>()
      .oneOf(paymentStatus, "The status invalid")
      .required("The status is required"),
    amount: yup
      .number()
      .transform((v) => (isNaN(v) ? undefined : v))
      .required("the amount require")
      .min(0),
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      method: "cod",
      status: "pending",
      amount: 0,
    },
  });

  const fetchPaymentMethodByIdCallBack = useCallback(async () => {
    if (openModal.id) {
      const res = await getPaymentMethodService(openModal.id);
      setPaymentMethod(res);
    }
  }, [openModal.id]);
  /** use effect */
  useEffect(() => {
    if (openModal.id) {
      fetchPaymentMethodByIdCallBack();
    }
  }, [openModal.id, fetchPaymentMethodByIdCallBack]);

  useEffect(() => {
    if (openModal.id) {
      reset({
        method: paymentMethod?.method,
        amount: paymentMethod?.amount,
        status: paymentMethod?.status,
      });
    } else {
      reset({
        method: "cod",
        amount: 0,
        status: "pending",
      });
    }
  }, [paymentMethod, reset, openModal.id]);

  /** context  */
  const { user } = useAuthContext();
  const onSubmit = async (data: FormData) => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (openModal.id) {
      dispatch(updatePaymentMethod({ ...data, _id: openModal.id }));
      toast.success("Update Succesfully");
    } else {
      dispatch(addPaymentMethod(data));
      toast.success("Add New  Succesfully");
    }
    handleClose();
  };
  const paymentOptions = paymentMethods.map((p) => {
    return { label: p, value: p };
  });
  const statusOptions = paymentStatus.map((p) => {
    return { label: p, value: p };
  });
  // const typeValue = useWatch({ control, name: "type" });

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "options",
  // });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomSelectField<FormData>
        name="method"
        control={control}
        label="Method"
        options={paymentOptions}
      />
      <CustomTextField<FormData>
        name="amount"
        label="Amount"
        variant="outlined"
        error={!!errors.amount}
        fullWidth
        control={control}
      />
      <CustomSelectField<FormData>
        name="status"
        control={control}
        label="Method"
        options={statusOptions}
      />

      {openModal && openModal.id ? (
        <Button type="submit">Update </Button>
      ) : (
        <Button type="submit" variant="outlined" sx={{ mt: 2 }}>
          Add New{" "}
        </Button>
      )}
    </form>
  );
};

export default PaymentMethodForm;
