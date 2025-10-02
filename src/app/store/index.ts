import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import postReducer from "./slices/postSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
  },
});

// 🔹 Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 🔹 Custom hook cho dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
