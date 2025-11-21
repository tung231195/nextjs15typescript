import { AxiosError } from "axios";
import { ProductType, Product, ATTRIBUTE_COLOR_ID, ATTRIBUTE_SIZE_ID } from "../types";
import customAxios from "../utils/customAxious";
export type AttributeVariant = {
  attributeId: typeof ATTRIBUTE_COLOR_ID | typeof ATTRIBUTE_SIZE_ID;
  valueString: string;
};
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

/** get categories */
export const getCategoryProducts = async ({
  slug,
  minPrice,
  maxPrice,
  variants,
  page,
  limit,
}: {
  slug: string;
  minPrice?: number;
  maxPrice?: number;
  variants?: AttributeVariant[];
  page?: number;
  limit?: number;
}) => {
  try {
    const res = await customAxios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/catalog/${slug}`, {
      params: { minPrice, maxPrice, variants: variants, page, limit: limit },
    });
    return res.data;
  } catch (e: unknown) {
    if (e instanceof Error) console.error(e.message);
    else console.error("Unknown error", e);
  }
};

export const getPriceRange = async (slug: string) => {
  try {
    const res = await customAxios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/catalog/${slug}/price-range`,
    );
    return res.data;
  } catch (e: unknown) {
    if (e instanceof Error) console.error(e.message);
    else console.error("Unknown error", e);
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

/** get products Relates */
const getProductsRelate = async (id: string, category: string) => {
  try {
    const products = await customAxios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${id}/relate`,
      { params: { category } },
    );
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
    const products = await customAxios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/id/${id}`,
    );
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

const getProductServiceBySlug = async (slug: string) => {
  try {
    const products = await customAxios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/slug/${slug}`,
    );
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
  getProductsRelate,
  getProductServiceBySlug,
};
