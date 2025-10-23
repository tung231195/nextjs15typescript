import {
  addPaymentMethodsService,
  deletePaymentMethodService,
  getPaymentMethodsService,
  updatePaymentMethodService,
} from "@/app/services/paymentMethodService";
import { PaymentMethod, PaymentMethodType } from "@/app/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk Actions

/** fetch paymentMethods */
export const fetchPaymentMethods = createAsyncThunk(
  "paymentMethods/fetchPaymentMethods",
  async () => {
    return await getPaymentMethodsService();
  },
);

/** add paymentMethod */
export const addPaymentMethod = createAsyncThunk(
  "paymentMethods/addPaymentMethod",
  async (paymentMethod: PaymentMethod) => {
    return await addPaymentMethodsService(paymentMethod);
  },
);

/** update paymentMethod */
export const updatePaymentMethod = createAsyncThunk(
  "paymentMethods/updatePaymentMethod",
  async (paymentMethod: PaymentMethodType) => {
    return await updatePaymentMethodService(paymentMethod);
  },
);

/** delete paymentMethod */
export const deletePaymentMethod = createAsyncThunk(
  "paymentMethods/deletePaymentMethod",
  async (_id: string) => {
    return await deletePaymentMethodService(_id);
  },
);
