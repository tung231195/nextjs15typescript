import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import postReducer from "./slices/postSlice";
import attributeReducer from "./slices/attributeSlice";
import categoryReducer from "./slices/categorySlide";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import deliveryReducer from "./slices/deliverySlice";
import paymentMethodReducer from "./slices/paymentSlice";

import synCarts from "./middleware/cart";

export const store = configureStore({
  reducer: {
    post: postReducer,
    attribute: attributeReducer,
    cate: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    paymentMethod: paymentMethodReducer,
    delivery: deliveryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(synCarts), // thêm vào cuối
});

// 🔹 Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 🔹 Custom hook cho dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
