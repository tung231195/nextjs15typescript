import { PaymentMethodType } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addPaymentMethod,
  deletePaymentMethod,
  fetchPaymentMethods,
  updatePaymentMethod,
} from "../../actions/payment";

interface PaymentMethodState {
  paymentMethods: PaymentMethodType[];
  loading: boolean;
  error: string | null;
}

const initialState: PaymentMethodState = {
  paymentMethods: [],
  loading: false,
  error: null,
};

const paymentMethodSlice = createSlice({
  name: "paymentMethod",
  initialState,
  reducers: {
    reset: (state) => {
      state.paymentMethods = [];
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchPaymentMethods
      .addCase(fetchPaymentMethods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPaymentMethods.fulfilled,
        (state, action: PayloadAction<PaymentMethodType[]>) => {
          state.loading = false;
          state.paymentMethods = action.payload;
        },
      )
      .addCase(fetchPaymentMethods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch paymentMethods";
      })

      // add paymentMethod
      .addCase(addPaymentMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPaymentMethod.fulfilled, (state, action: PayloadAction<PaymentMethodType>) => {
        state.loading = false;
        state.paymentMethods = [...state.paymentMethods, action.payload];
      })
      .addCase(addPaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch paymentMethods";
      })

      // add paymentMethod
      .addCase(updatePaymentMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePaymentMethod.fulfilled, (state, action: PayloadAction<PaymentMethodType>) => {
        state.loading = false;
        const findIndex = state.paymentMethods.findIndex((a) => a._id == action.payload._id);
        state.paymentMethods[findIndex] = action.payload;
      })
      .addCase(updatePaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch paymentMethods";
      })

      // delete paymentMethod
      .addCase(deletePaymentMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePaymentMethod.fulfilled, (state, action: PayloadAction<string>) => {
        console.log("delete action", action.payload, state.paymentMethods);
        state.loading = false;
        state.paymentMethods = state.paymentMethods.filter((p) => p._id !== action.payload);
      })
      .addCase(deletePaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch paymentMethods";
      });
  },
});

export const { reset } = paymentMethodSlice.actions;
export default paymentMethodSlice.reducer;
