import { AxiosError } from "axios";
import { CategoryType, Category } from "../types";
import customAxios from "../utils/customAxious";

/** get categories */
const getCategoriesService = async () => {
  try {
    const categories = await customAxios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/categories`);
    return categories.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }

  //return login;
};

/** get category */
const getCategoryService = async (id: string) => {
  try {
    const categories = await customAxios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/categories/${id}`,
    );
    return categories.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }

  //return login;
};

/** add category */
const addCategoriesService = async (data: Category) => {
  try {
    const categories = await customAxios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/categories`,
      data,
    );
    return categories.data;
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

/** update category */
const updateCategoryService = async (data: CategoryType) => {
  console.log("data update", data);
  try {
    const categories = await customAxios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/categories/${data._id}`,
      data,
    );
    return categories.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};
/** delete category */
const deleteCategoryService = async (_id: string) => {
  try {
    const categories = await customAxios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/categories/${_id}`,
    );
    return categories.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};
export {
  getCategoriesService,
  addCategoriesService,
  updateCategoryService,
  deleteCategoryService,
  getCategoryService,
};
