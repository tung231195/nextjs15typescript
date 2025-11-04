import { AxiosError } from "axios";
import { ProductType, Product } from "../types";
import customAxios from "../utils/customAxious";

/** get products */
const getProductsService = async () => {
  try {
    const products = await customAxios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/products`);
    return products.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }

  //return login;
};

export const getProductsCategoryService = async (categoryId: string) => {
  try {
    const res = await customAxios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/category/${categoryId}`,
    );
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching products by category:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    return null; // tránh undefined
  }
};

/** get products Sale */
const getProductsSaleService = async () => {
  try {
    const products = await customAxios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/sale`);
    return products.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }

  //return login;
};
/** get product */
const getProductService = async (id: string) => {
  try {
    const products = await customAxios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/${id}`);
    return products.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }

  //return login;
};

/** add product */
const addProductsService = async (data: Product) => {
  try {
    const products = await customAxios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/products`, data);
    return products.data;
  } catch (e: unknown) {
    const error = e as AxiosError<{ message: string }>;
    if (error.response) {
      console.error("API error:", error.response.data?.message, "status:", error.response.status);
    } else {
      console.error("Unexpected error:", error.message);
    }
    throw error;
  }
};

/** update product */
const updateProductService = async (data: ProductType) => {
  console.log("data update", data);
  try {
    const products = await customAxios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${data._id}`,
      data,
    );
    return products.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};
/** delete product */
const deleteProductService = async (_id: string) => {
  try {
    const products = await customAxios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${_id}`,
    );
    return products.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};
export {
  getProductsService,
  addProductsService,
  updateProductService,
  deleteProductService,
  getProductService,
  getProductsSaleService,
};
