import {
  addCategoriesService,
  deleteCategoryService,
  getCategoriesService,
  updateCategoryService,
} from "@/app/services/categoryService";
import { Category, CategoryType } from "@/app/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk Actions

/** fetch categorys */
export const fetchCategories = createAsyncThunk("categorys/fetchCategories", async () => {
  return await getCategoriesService();
});

/** add category */
export const addCategory = createAsyncThunk("categorys/addCategory", async (category: Category) => {
  return await addCategoriesService(category);
});

/** update category */
export const updateCategory = createAsyncThunk(
  "categorys/updateCategory",
  async (category: CategoryType) => {
    return await updateCategoryService(category);
  },
);

/** delete category */
export const deleteCategory = createAsyncThunk("categorys/deleteCategory", async (_id: string) => {
  return await deleteCategoryService(_id);
});
