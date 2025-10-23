"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@mui/material";
import CustomTextField from "@/app/components/custom/CustomTextField";
import { useAuthContext } from "@/app/context/AuthContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { addCategory, updateCategory } from "@/app/store/actions/category";
import { useCallback, useEffect, useState } from "react";
import { getCategoryService } from "@/app/services/categoryService";
import { CategoryType } from "@/app/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CustomRichEditor from "@/app/components/custom/CustomRichEditor";

type TPropCategoryForm = {
  handleClose: () => void;
  openModal: { open: boolean; id: string };
};

const CategoryForm = (props: TPropCategoryForm) => {
  const router = useRouter();
  const { handleClose, openModal } = props;
  const [category, setCategory] = useState<CategoryType>();
  const dispatch = useDispatch<AppDispatch>();
  type FormData = {
    name: string;
    description: string;
  };
  const schema = yup.object().shape({
    name: yup.string().required("The Title is required"),
    description: yup.string().required("The Description is required"),
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const fetchCategoryByIdCallBack = useCallback(async () => {
    if (openModal.id) {
      const res = await getCategoryService(openModal.id);
      setCategory(res);
    }
  }, [openModal.id]);
  /** use effect */
  useEffect(() => {
    if (openModal.id) {
      fetchCategoryByIdCallBack();
    }
  }, [openModal.id, fetchCategoryByIdCallBack]);

  useEffect(() => {
    if (openModal.id) {
      reset({
        name: category?.name,
        description: category?.description,
      });
    } else {
      reset({
        name: "",
        description: "",
      });
    }
  }, [category, reset, openModal.id]);

  /** context  */
  const { user } = useAuthContext();
  const onSubmit = async (data: FormData) => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (openModal.id) {
      dispatch(updateCategory({ ...data, _id: openModal.id }));
      toast.success("Update Succesfully");
    } else {
      dispatch(addCategory(data));
      toast.success("Add New  Succesfully");
    }
    handleClose();
  };

  // const typeValue = useWatch({ control, name: "type" });

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "options",
  // });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomTextField<FormData>
        name="name"
        label="Name"
        variant="outlined"
        error={!!errors.name}
        fullWidth
        control={control}
      />

      <CustomRichEditor<FormData>
        name="description"
        control={control}
        label="Nội dung"
        error={!!errors.description}
        helperText={errors.description?.message}
      />

      {openModal && openModal.id ? (
        <Button type="submit">Update </Button>
      ) : (
        <Button type="submit">Add New</Button>
      )}
    </form>
  );
};

export default CategoryForm;
