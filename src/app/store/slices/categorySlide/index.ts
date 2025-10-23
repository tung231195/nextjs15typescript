import { CategoryType } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "../../actions/category";

interface CategoryState {
  categories: CategoryType[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    reset: (state) => {
      state.categories = [];
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<CategoryType[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch categories";
      })

      // add category
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action: PayloadAction<CategoryType>) => {
        state.loading = false;
        state.categories = [...state.categories, action.payload];
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch categories";
      })

      // add category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action: PayloadAction<CategoryType>) => {
        state.loading = false;
        const findIndex = state.categories.findIndex((a) => a._id == action.payload._id);
        state.categories[findIndex] = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch categories";
      })

      // delete category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
        console.log("delete action", action.payload, state.categories);
        state.loading = false;
        state.categories = state.categories.filter((p) => p._id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch categories";
      });
  },
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
