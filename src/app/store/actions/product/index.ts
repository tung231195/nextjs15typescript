import {
  addProductsService,
  deleteProductService,
  getProductsService,
  updateProductService,
} from "@/app/services/productService";
import { Product, ProductType } from "@/app/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk Actions

/** fetch products */
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  return await getProductsService();
});

/** add product */
export const addProduct = createAsyncThunk("products/addProduct", async (product: Product) => {
  return await addProductsService(product);
});

/** update product */
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product: ProductType) => {
    return await updateProductService(product);
  },
);

/** delete product */
export const deleteProduct = createAsyncThunk("products/deleteProduct", async (_id: string) => {
  return await deleteProductService(_id);
});
