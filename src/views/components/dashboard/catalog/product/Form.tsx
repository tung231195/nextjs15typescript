"use client";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { Button } from "@mui/material";
// import CustomTextField from "@/app/components/custom/CustomTextField";
// import { useAuthContext } from "@/app/context/AuthContext";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/app/store";
// import { addProduct, updateProduct } from "@/app/store/actions/product";
// import { useCallback, useEffect, useState } from "react";
// import { getProductService } from "@/app/services/productService";
// import { ProductAttributeValue, ProductType, ProductVariant } from "@/app/types";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import CustomRichEditor from "@/app/components/custom/CustomRichEditor";
// import CustomFileUploadField from "@/app/components/custom/CustomFileUploadField";
// import CustomSelectField from "@/app/components/custom/CustomSelectField";
// import { fetchCategories } from "@/app/store/actions/category";
// import { fetchAttributes } from "@/app/store/actions/attribute";
// import ProductVariantForm from "./ProductVariant";
// import { FormProvider } from "react-hook-form";
// import { generateVariantsFromAttributes } from "@/app/utils";
// import ProductAttributeForm from "./ProductAttribute";

type TPropProductForm = {
  handleClose: () => void;
  openModal: { open: boolean; id: string };
};
// type TCateOption = { label: string; value: string };

const ProductForm = (props: TPropProductForm) => {
  console.log("product data", props);
  return <>Product Form Data</>;
  // const [cateOptions, setCateOptions] = useState<TCateOption[]>([]);
  // const attributes = useSelector((state: RootState) => state.attribute.attributes);
  // const router = useRouter();
  // const { handleClose, openModal } = props;
  // const [product, setProduct] = useState<ProductType>();
  // const dispatch = useDispatch<AppDispatch>();
  // const categories = useSelector((state: RootState) => state.cate.categories);

  // useEffect(() => {
  //   dispatch(fetchCategories());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (categories.length > 0) {
  //     const options = categories.map((c) => ({ label: c.name, value: c._id }));
  //     setCateOptions(options);
  //   }
  // }, [categories]);

  // useEffect(() => {
  //   dispatch(fetchAttributes());
  // }, [dispatch]);

  // type FormData = {
  //   name: string;
  //   description: string;
  //   images: string[];
  //   category: string;
  //   price: number;
  //   stock: number;
  //   variants: ProductVariant[];
  //   attributes: ProductAttributeValue[];
  // };
  // const productVariantSchema = yup.object({
  //   sku: yup.string().optional(),
  //   price: yup.number().required("Variant price is required"),
  //   stock: yup.number().required("Variant stock is required"),
  //   attributes: yup
  //     .array()
  //     .of(
  //       yup.object({
  //         attribute: yup.string().required("Attribute is required"),
  //         valueString: yup.string().optional(),
  //         valueNumber: yup.number().optional(),
  //         valueBoolean: yup.boolean().optional(),
  //       }),
  //     )
  //     .min(1, "At least one attribute is required"),
  //   images: yup.array().of(yup.string()).optional(),
  // });

  // const schema = yup.object().shape({
  //   name: yup.string().required("The Title is required"),
  //   price: yup.number().required("The Price is required"),
  //   stock: yup.number().required("The Price is required"),
  //   description: yup.string().required("the description is required"),
  //   images: yup.array().of(yup.string().defined()).optional().default([]),
  //   category: yup.string().required("The Title is required"),
  //   variants: yup.array().of(productVariantSchema).default([]),
  //   attributes: yup.array().of(
  //     yup.object({
  //       attribute: yup.string().required("The attrribute is require"),
  //       valueString: yup.string().optional(),
  //     }),
  //   ),
  // });
  // const methods = useForm<FormData>({
  //   resolver: yupResolver(schema),
  //   defaultValues: {
  //     name: "",
  //     description: "",
  //     images: [],
  //     category: "",
  //     price: 0,
  //     stock: 0,
  //     variants: [],
  //   },
  // });
  // const {
  //   control,
  //   handleSubmit,
  //   setValue,
  //   reset,
  //   formState: { errors },
  // } = methods;
  // const fetchProductByIdCallBack = useCallback(async () => {
  //   if (openModal.id) {
  //     const res = await getProductService(openModal.id);
  //     setProduct(res);
  //   }
  // }, [openModal.id]);
  // /** use effect */
  // useEffect(() => {
  //   if (openModal.id) {
  //     fetchProductByIdCallBack();
  //   }
  // }, [openModal.id, fetchProductByIdCallBack]);

  // useEffect(() => {
  //   console.log("product options", product);
  //   if (!product) return;
  //   if (openModal.id) {
  //     reset({
  //       name: product?.name,
  //       description: product?.description,
  //       images: product?.images ?? [],
  //       category: product.category ?? "",
  //       variants: product?.variants ?? [],
  //       attributes: product?.attributes ?? [],
  //     });
  //   } else {
  //     reset({
  //       name: "",
  //       description: "",
  //       images: [],
  //       category: "",
  //       attributes: [],
  //       variants: [
  //         {
  //           sku: "",
  //           price: 0,
  //           stock: 0,
  //           attributes: [],
  //           images: [],
  //         },
  //       ],
  //     });
  //   }
  // }, [product, reset, openModal.id]);

  // /** context  */
  // const { user } = useAuthContext();
  // const onSubmit = async (data: FormData) => {
  //   console.log("data product", data);
  //   if (!user) {
  //     router.push("/login");
  //     return;
  //   }
  //   if (openModal.id) {
  //     dispatch(updateProduct({ ...data, _id: openModal.id }));
  //     toast.success("Update Succesfully");
  //   } else {
  //     console.log(" add product ");
  //     dispatch(addProduct(data));
  //     toast.success("Add New  Succesfully");
  //   }
  //   handleClose();
  // };

  // const onGenerateVariants = () => {
  //   const generated = generateVariantsFromAttributes(attributes);
  //   console.log("generated att", generated);
  //   setValue("variants", generated);
  // };

  // // const typeValue = useWatch({ control, name: "type" });
  // console.log("errror", errors);
  // return (
  //   <FormProvider {...methods}>
  //     <form onSubmit={handleSubmit(onSubmit)}>
  //       <CustomTextField<FormData>
  //         name="name"
  //         label="Name"
  //         variant="outlined"
  //         error={!!errors.name}
  //         fullWidth
  //         control={control}
  //       />
  //       <CustomSelectField<FormData>
  //         name="category"
  //         control={control}
  //         label="Category"
  //         options={cateOptions}
  //       />
  //       <CustomTextField<FormData>
  //         name="price"
  //         label="Price"
  //         variant="outlined"
  //         error={!!errors.name}
  //         fullWidth
  //         control={control}
  //       />
  //       <CustomTextField<FormData>
  //         name="stock"
  //         label="Stock"
  //         variant="outlined"
  //         error={!!errors.name}
  //         fullWidth
  //         control={control}
  //       />

  //       <ProductAttributeForm attributes={attributes} />
  //       <Button onClick={onGenerateVariants} variant="outlined">
  //         Generate Variants
  //       </Button>
  //       <ProductVariantForm attributes={attributes} />

  //       <CustomRichEditor<FormData>
  //         name="description"
  //         control={control}
  //         label="Nội dung"
  //         error={!!errors.description}
  //         helperText={errors.description?.message}
  //       />

  //       <CustomFileUploadField<FormData>
  //         name="images"
  //         control={control}
  //         label="Upload Product Images"
  //         multiple
  //       />

  //       {openModal && openModal.id ? (
  //         <Button type="submit">Update </Button>
  //       ) : (
  //         <Button type="submit">Add New</Button>
  //       )}
  //     </form>
  //   </FormProvider>
  // );
};

export default ProductForm;
