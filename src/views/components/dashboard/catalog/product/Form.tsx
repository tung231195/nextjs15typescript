"use client";
import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import CustomTextField from "@/app/components/custom/CustomTextField";
import { useAuthContext } from "@/app/context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { addProduct, updateProduct } from "@/app/store/actions/product";
import { useCallback, useEffect, useState } from "react";
import { getProductService } from "@/app/services/productService";
import {
  AttributeEnum,
  AttributeOption,
  DiscountType,
  ProductAttributeValue,
  ProductType,
  ProductVariant,
} from "@/app/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CustomRichEditor from "@/app/components/custom/CustomRichEditor";
import CustomFileUploadField from "@/app/components/custom/CustomFileUploadField";
import CustomSelectField from "@/app/components/custom/CustomSelectField";
import { fetchCategories } from "@/app/store/actions/category";
import { fetchAttributes } from "@/app/store/actions/attribute";
import ProductVariantForm from "./ProductVariant";
import { FormProvider } from "react-hook-form";
import { generateSKU, generateVariantsFromAttributes } from "@/app/utils";
import ProductAttributeForm from "./ProductAttribute";
import CustomDatePicker from "@/app/components/custom/CustomDatePicker";

type TPropProductForm = {
  handleClose: () => void;
  openModal: { open: boolean; id: string };
};
type TCateOption = { label: string; value: string };

const ProductForm = (props: TPropProductForm) => {
  //return <>Product Form Data</>;
  const productTypeOptions = [
    { label: "Simple", value: "simple" },
    { label: "Variant", value: "variant" },
  ];
  const [cateOptions, setCateOptions] = useState<TCateOption[]>([]);
  const attributes = useSelector((state: RootState) => state.attribute.attributes);
  const router = useRouter();
  const { handleClose, openModal } = props;
  //const [date, setDate] = useState<Date | null>(null);
  const [showVariant, setShowVariant] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductType>();
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.cate.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      const options = categories.map((c) => ({ label: c.name, value: c._id }));
      setCateOptions(options);
    }
  }, [categories]);

  useEffect(() => {
    dispatch(fetchAttributes());
  }, [dispatch]);

  type FormData = {
    name: string;
    type: "simple" | "variant";
    description: string;
    images: string[];
    category: string;
    price: number;
    discount: DiscountType;
    endDate: Date;
    stock: number;
    variants: ProductVariant[];
    attributes: ProductAttributeValue[];
  };
  // ✅ Định nghĩa schema cho các phần con trước
  const productAttributeValueSchema: yup.ObjectSchema<ProductAttributeValue> = yup.object({
    attribute: yup.string().required("Attribute is required"),
    valueString: yup.string().optional(),
    valueNumber: yup.number().optional(),
    valueBoolean: yup.boolean().optional(),
  });

  const productVariantSchema: yup.ObjectSchema<ProductVariant> = yup.object({
    _id: yup.string().optional(),
    sku: yup.string().required("SKU is required"),
    price: yup.number().required("Variant price is required"),
    stock: yup.number().required("Variant stock is required"),
    attributes: yup.array(productAttributeValueSchema).required(),
    images: yup.array().of(yup.string().defined()).optional(),
  });

  // ✅ Schema chính
  const schema: yup.ObjectSchema<FormData> = yup.object({
    name: yup.string().required("The Title is required"),
    type: yup.mixed<"simple" | "variant">().oneOf(["simple", "variant"]).required(),
    description: yup.string().required("The description is required"),
    images: yup.array(yup.string().defined()).required("The images are required"),
    category: yup.string().required("The Category is required"),
    price: yup.number().required("The Price is required"),
    discount: yup.object({
      type: yup.mixed<"percent" | "amount">().oneOf(["percent", "amount"]).required(),
      value: yup.number().min(0).required(),
    }),
    endDate: yup.date().required("").default(new Date()),
    stock: yup.number().required("The Stock is required"),
    variants: yup.array(productVariantSchema).required(),
    attributes: yup.array(productAttributeValueSchema).required(),
  });

  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      type: "simple",
      description: "",
      images: [],
      discount: { type: "amount", value: 0 },
      category: "",
      price: 0,
      stock: 0,
      variants: [],
      attributes: [],
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = methods;
  const fetchProductByIdCallBack = useCallback(async () => {
    if (openModal.id) {
      const res = await getProductService(openModal.id);
      setProduct(res);
    }
  }, [openModal.id]);
  /** use effect */
  useEffect(() => {
    if (openModal.id) {
      fetchProductByIdCallBack();
    }
  }, [openModal.id, fetchProductByIdCallBack]);

  useEffect(() => {
    if (!product) return;
    if (openModal.id) {
      const cat = product.category;
      const categoryId = typeof cat === "object" && cat !== null ? cat._id : cat;

      reset({
        name: product?.name ?? "",
        type: product?.type ?? "",
        description: product?.description ?? "",
        images: product?.images ?? [],
        category: categoryId,
        price: product?.price ?? 0,
        discount: product.discount,
        endDate: product.endDate,
        stock: product?.stock ?? 0,
        variants: product?.variants ?? [],
        attributes: product?.attributes ?? [],
      });
    } else {
      reset({
        name: "",
        description: "",
        images: [],
        stock: 0,
        category: "",
        price: 0,
        discount: { type: "amount", value: 0 },
        attributes: [],
        variants: [
          {
            sku: "",
            price: 0,
            stock: 0,
            attributes: [],
            images: [],
          },
        ],
      });
    }
  }, [product, reset, openModal.id]);

  /** context  */
  const { user } = useAuthContext();
  const onSubmit = async (data: FormData) => {
    //if (date) setValue("endDate", date);
    if (!user) {
      router.push("/login");
      return;
    }
    if (openModal.id) {
      dispatch(updateProduct({ ...data, _id: openModal.id }));
      toast.success("Update Succesfully");
    } else {
      dispatch(addProduct(data));
      toast.success("Add New  Succesfully");
    }
    handleClose();
  };

  const onGenerateVariants = () => {
    const generated = generateVariantsFromAttributes(attributes);
    setValue("variants", generated);
  };

  // const typeValue = useWatch({ control, name: "type" });
  const attributeOptions: AttributeOption[] = (attributes || []).map((att) => ({
    _id: att._id,
    name: att.name,
    type: att.type as AttributeEnum,
    options: att.options
      ? att.options.map((opt: { label: string; value: string }) => ({
          label: opt.label,
          value: opt.value,
        }))
      : undefined,
  }));

  const watchName = useWatch({ control, name: "name" });
  const watchProductType = useWatch({ control, name: "type" });
  const watchPrice = useWatch({ control, name: "price" });
  const watchDicount = useWatch({ control, name: "discount" });
  const watchVariants = useWatch({ control, name: "variants" });
  const [finalPrice, setFinalPrice] = useState<number>(0);

  useEffect(() => {
    if (!watchProductType) return;
    if (watchProductType === "simple") {
      setShowVariant(false);
    } else {
      setShowVariant(true);
    }
  }, [watchProductType]);

  useEffect(() => {
    if (!watchPrice || !watchDicount) return;
    if (watchDicount.type === "amount") {
      setFinalPrice(watchPrice - watchDicount.value);
    } else {
      setFinalPrice(watchPrice - watchDicount.value * (watchPrice / 100));
    }
  }, [watchDicount, watchPrice]);

  // 🔹 Tự động cập nhật SKU mỗi khi tên hoặc thuộc tính thay đổi
  useEffect(() => {
    if (!watchName || !watchVariants?.length) return;

    // Sinh variants mới có SKU
    const updatedVariants = watchVariants.map((variant) => {
      const newSku = generateSKU(watchName, variant.attributes);
      // Nếu SKU đã đúng -> không thay đổi
      if (variant.sku === newSku) return variant;
      return { ...variant, sku: newSku };
    });

    // ✅ Chỉ gọi setValue nếu có ít nhất 1 variant thay đổi SKU
    const hasChange = updatedVariants.some((v, i) => v.sku !== watchVariants[i]?.sku);

    if (hasChange) {
      setValue("variants", updatedVariants, { shouldDirty: true });
    }
  }, [watchName, watchVariants, setValue]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomSelectField<FormData>
          name="type"
          control={control}
          label="Type"
          options={productTypeOptions}
        />
        <CustomTextField<FormData>
          name="name"
          label="Name"
          variant="outlined"
          error={!!errors.name}
          fullWidth
          control={control}
        />
        <CustomSelectField<FormData>
          name="category"
          control={control}
          label="Category"
          options={cateOptions}
        />
        <CustomTextField<FormData>
          name="price"
          label="Price"
          variant="outlined"
          error={!!errors.name}
          fullWidth
          control={control}
        />
        <Controller
          name="discount.type"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Discount Type"
              fullWidth
              margin="normal"
              error={!!errors.discount?.type}
              helperText={errors.discount?.type?.message}
            >
              <MenuItem value="percent">Percent (%)</MenuItem>
              <MenuItem value="amount">Amount</MenuItem>
            </TextField>
          )}
        />

        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <CustomDatePicker
              label="End date"
              value={field.value ?? null}
              onChange={(date) => field.onChange(date)}
              minDate={new Date()}
            />
          )}
        />
        <CustomTextField<FormData>
          name="discount.value"
          label="Discount"
          variant="outlined"
          error={!!errors.discount}
          fullWidth
          control={control}
        />
        {/* Hiển thị giá sau giảm */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            💰 Final Price: <strong>{finalPrice > 0 ? finalPrice.toFixed(2) : 0}</strong>
          </Typography>
        </Box>

        <CustomTextField<FormData>
          name="stock"
          label="Stock"
          variant="outlined"
          error={!!errors.name}
          fullWidth
          control={control}
        />

        <ProductAttributeForm attributes={attributeOptions} />
        {showVariant && (
          <>
            <Button onClick={onGenerateVariants} variant="outlined">
              Generate Variants
            </Button>
            <ProductVariantForm attributes={attributeOptions} />
          </>
        )}
        <CustomRichEditor<FormData>
          name="description"
          control={control}
          label="Nội dung"
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <CustomFileUploadField<FormData>
          name="images"
          control={control}
          label="Upload Product Images"
          multiple
        />

        {openModal && openModal.id ? (
          <Button type="submit">Update </Button>
        ) : (
          <Button type="submit">Add New</Button>
        )}
      </form>
    </FormProvider>
  );
};

export default ProductForm;
