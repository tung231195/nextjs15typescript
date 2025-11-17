import { DeliveryMethodType } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addDeliveryMethod,
  deleteDeliveryMethod,
  fetchDeliveryMethods,
  updateDeliveryMethod,
} from "../../actions/delivery";

interface DeliveryMethodState {
  deliveryMethods: DeliveryMethodType[];
  loading: boolean;
  error: string | null;
}

const initialState: DeliveryMethodState = {
  deliveryMethods: [],
  loading: false,
  error: null,
};

const deliveryMethodSlice = createSlice({
  name: "deliveryMethod",
  initialState,
  reducers: {
    reset: (state) => {
      state.deliveryMethods = [];
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchDeliveryMethods
      .addCase(fetchDeliveryMethods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDeliveryMethods.fulfilled,
        (state, action: PayloadAction<DeliveryMethodType[]>) => {
          state.loading = false;
          state.deliveryMethods = action.payload;
        },
      )
      .addCase(fetchDeliveryMethods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch deliveryMethods";
      })

      // add deliveryMethod
      .addCase(addDeliveryMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDeliveryMethod.fulfilled, (state, action: PayloadAction<DeliveryMethodType>) => {
        state.loading = false;
        state.deliveryMethods = [...state.deliveryMethods, action.payload];
      })
      .addCase(addDeliveryMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch deliveryMethods";
      })

      // add deliveryMethod
      .addCase(updateDeliveryMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateDeliveryMethod.fulfilled,
        (state, action: PayloadAction<DeliveryMethodType>) => {
          state.loading = false;
          const findIndex = state.deliveryMethods.findIndex((a) => a._id == action.payload._id);
          state.deliveryMethods[findIndex] = action.payload;
        },
      )
      .addCase(updateDeliveryMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch deliveryMethods";
      })

      // delete deliveryMethod
      .addCase(deleteDeliveryMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDeliveryMethod.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.deliveryMethods = state.deliveryMethods.filter((p) => p._id !== action.payload);
      })
      .addCase(deleteDeliveryMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch deliveryMethods";
      });
  },
});

export const { reset } = deliveryMethodSlice.actions;
export default deliveryMethodSlice.reducer;
