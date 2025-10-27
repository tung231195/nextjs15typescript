"use client";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import CustomTextField from "@/app/components/custom/CustomTextField";
import { useAuthContext } from "@/app/context/AuthContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { addAttribute, updateAttribute } from "@/app/store/actions/attribute";
import { useCallback, useEffect, useState } from "react";
import { getAttributeService } from "@/app/services/attributeService";
import { AttributeType } from "@/app/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CustomSelectField from "@/app/components/custom/CustomSelectField";
import CustomSwitchField from "@/app/components/custom/CustomSwitchField";
import { GridAddIcon, GridDeleteIcon } from "@mui/x-data-grid";
type TPropAttributeForm = {
  handleClose: () => void;
  openModal: { open: boolean; id: string };
};
export interface IOption {
  label: string;
  value: string | number;
}
const AttributeForm = (props: TPropAttributeForm) => {
  const router = useRouter();
  const { handleClose, openModal } = props;
  const [attribute, setAttribute] = useState<AttributeType>();
  const dispatch = useDispatch<AppDispatch>();
  type FormData = {
    name: string;
    type: string;
    isFilterable: boolean;
    isVisible: boolean;
    unit?: string;
    options: IOption[];
  };
  const schema = yup.object().shape({
    name: yup.string().required("The Title is required"),
    type: yup.string().required("The Content is required"),
    isFilterable: yup.boolean().required(),
    isVisible: yup.boolean().required(),
    options: yup
      .array()
      .of(
        yup.object({
          label: yup.string().required("Option label is required"),
          value: yup.mixed<string | number>().required("Option value is required"),
        }),
      )
      .default([])
      .required(),
  });
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      type: "",
      isFilterable: true,
      isVisible: true,
      unit: "kg",
      options: [],
    },
  });

  const fetchAttributeByIdCallBack = useCallback(async () => {
    if (openModal.id) {
      const res = await getAttributeService(openModal.id);
      console.log("res edit attt", res);
      setAttribute(res);
    }
  }, [openModal.id]);
  /** use effect */
  useEffect(() => {
    if (openModal.id) {
      fetchAttributeByIdCallBack();
    }
  }, [openModal.id, fetchAttributeByIdCallBack]);

  useEffect(() => {
    if (openModal.id && attribute) {
      reset({
        name: attribute.name,
        type: attribute.type,
        options: Array.isArray(attribute.options)
          ? attribute.options.map((opt: any) =>
              typeof opt === "string"
                ? { label: opt, value: opt } // ✅ convert string → {label, value}
                : opt,
            )
          : [], // fallback nếu undefined
        isFilterable: attribute.isFilterable ?? true,
        isVisible: attribute.isVisible ?? true,
        unit: "kg",
      });
    } else {
      reset({
        name: "",
        type: "",
        options: [],
        isFilterable: true,
        isVisible: true,
        unit: "kg",
      });
    }
  }, [attribute, openModal.id, reset]);

  /** context  */
  const { user } = useAuthContext();
  const onSubmit = async (data: FormData) => {
    if (!user) {
      router.push("/login");
      return;
    }

    const payload = {
      ...data,
      options:
        data.type === "enum"
          ? data.options.map((opt) => opt.value.toString()) // ✅ convert object[] → string[]
          : [],
    };

    if (openModal.id) {
      dispatch(updateAttribute({ ...payload, _id: openModal.id }));
      toast.success("Update Successfully");
    } else {
      dispatch(addAttribute(payload));
      toast.success("Add New Successfully");
    }

    handleClose();
  };

  const typeValue = useWatch({ control, name: "type" });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });
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
      <CustomSelectField<FormData>
        name="type"
        control={control}
        label="Type"
        options={[
          { label: "String", value: "string" },
          { label: "Number", value: "number" },
          { label: "Boolean", value: "boolean" },
          { label: "Enum", value: "enum" },
        ]}
      />

      {typeValue === "enum" && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Options
          </Typography>
          {fields.map((field, index) => (
            <Box key={field.id} sx={{ display: "flex", gap: 1, mb: 1 }}>
              <TextField
                {...register(`options.${index}.label` as const)}
                placeholder="Label"
                fullWidth
              />
              <TextField
                {...register(`options.${index}.value` as const)}
                placeholder="Value"
                fullWidth
              />
              <IconButton onClick={() => remove(index)}>
                <GridDeleteIcon />
              </IconButton>
            </Box>
          ))}

          <Button onClick={() => append({ label: "", value: "" })} startIcon={<GridAddIcon />}>
            Add Option
          </Button>
        </Box>
      )}
      {typeValue !== "enum" && (
        <CustomSelectField
          name="unit"
          control={control}
          label="Unit"
          options={[
            { label: "kg", value: "kg" },
            { label: "weight", value: "weight" },
          ]}
        />
      )}
      <CustomSwitchField label="Is Filterable" control={control} name="isFilterable" />
      <CustomSwitchField label="Is Visible" control={control} name="isVisible" />
      {openModal && openModal.id ? (
        <Button type="submit">Update </Button>
      ) : (
        <Button type="submit">Add New</Button>
      )}
    </form>
  );
};

export default AttributeForm;
