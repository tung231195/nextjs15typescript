"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@mui/material";
import CustomTextField from "@/app/components/custom/CustomTextField";
import { useAuthContext } from "@/app/context/AuthContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { addDeliveryMethod, updateDeliveryMethod } from "@/app/store/actions/delivery";
import { useCallback, useEffect, useState } from "react";
import { getDeliveryMethodService } from "@/app/services/deliveryService";
import { DeliveryMethodType } from "@/app/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CustomSelectField from "@/app/components/custom/CustomSelectField";

type TPropDeliveryMethodForm = {
  handleClose: () => void;
  openModal: { open: boolean; id: string };
};
export interface IOption {
  label: string;
  value: string | number;
}
const DeliveryMethodForm = (props: TPropDeliveryMethodForm) => {
  const router = useRouter();
  const { handleClose, openModal } = props;
  const [delivery, setDeliveryMethod] = useState<DeliveryMethodType>();
  const dispatch = useDispatch<AppDispatch>();
  type FormData = {
    method: (typeof deliveryMethods)[number];
    status: (typeof deliveryStatus)[number];
    shippingFee: number;
  };
  const deliveryMethods = ["ghn", "ghtk", "vnpost", "grab", "manual"] as const;
  const deliveryStatus = ["pending", "processing", "shipped", "delivered", "cancelled"] as const;
  const schema = yup.object().shape({
    method: yup
      .mixed<(typeof deliveryMethods)[number]>()
      .oneOf(deliveryMethods, "Phương thức van chuyen không hợp lệ")
      .required("Phương thức van chuyen là bắt buộc"),
    status: yup
      .mixed<(typeof deliveryStatus)[number]>()
      .oneOf(deliveryStatus, "The status invalid")
      .required("The status is required"),
    shippingFee: yup
      .number()
      .transform((v) => (isNaN(v) ? undefined : v))
      .required("the shipping fee is required"),
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      method: "ghn",
      status: "pending",
      shippingFee: 0,
    },
  });

  const fetchDeliveryMethodByIdCallBack = useCallback(async () => {
    if (openModal.id) {
      const res = await getDeliveryMethodService(openModal.id);
      console.log("res edit attt", res);
      setDeliveryMethod(res);
    }
  }, [openModal.id]);
  /** use effect */
  useEffect(() => {
    if (openModal.id) {
      fetchDeliveryMethodByIdCallBack();
    }
  }, [openModal.id, fetchDeliveryMethodByIdCallBack]);

  useEffect(() => {
    if (openModal.id) {
      reset({
        method: delivery?.method,
        status: delivery?.status,
        shippingFee: delivery?.shippingFee,
      });
    } else {
      reset({
        method: "ghn",
        status: "pending",
        shippingFee: 0,
      });
    }
  }, [delivery, reset, openModal.id]);

  /** context  */
  const { user } = useAuthContext();
  const onSubmit = async (data: FormData) => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (openModal.id) {
      dispatch(updateDeliveryMethod({ ...data, _id: openModal.id }));
      toast.success("Update Succesfully");
    } else {
      dispatch(addDeliveryMethod(data));
      toast.success("Add New  Succesfully");
    }
    handleClose();
  };

  const statusOptions = deliveryStatus.map((p) => {
    return { label: p, value: p };
  });
  const deliveryOptions = deliveryMethods.map((p) => {
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
        label="Delivery Method"
        options={deliveryOptions}
      />
      <CustomTextField<FormData>
        name="shippingFee"
        label="Shipping Fee"
        variant="outlined"
        error={!!errors.shippingFee}
        fullWidth
        control={control}
      />
      <CustomSelectField<FormData>
        name="status"
        control={control}
        label="Status"
        options={statusOptions}
      />
      {openModal && openModal.id ? (
        <Button type="submit">Update </Button>
      ) : (
        <Button type="submit">Add New</Button>
      )}
    </form>
  );
};

export default DeliveryMethodForm;
