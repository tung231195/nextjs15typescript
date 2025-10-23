import { AttributeType } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addAttribute,
  deleteAttribute,
  fetchAttributes,
  updateAttribute,
} from "../../actions/attribute";

interface AttributeState {
  attributes: AttributeType[];
  loading: boolean;
  error: string | null;
}

const initialState: AttributeState = {
  attributes: [],
  loading: false,
  error: null,
};

const attributeSlice = createSlice({
  name: "attribute",
  initialState,
  reducers: {
    reset: (state) => {
      state.attributes = [];
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAttributes
      .addCase(fetchAttributes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttributes.fulfilled, (state, action: PayloadAction<AttributeType[]>) => {
        state.loading = false;
        state.attributes = action.payload;
      })
      .addCase(fetchAttributes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch attributes";
      })

      // add attribute
      .addCase(addAttribute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAttribute.fulfilled, (state, action: PayloadAction<AttributeType>) => {
        state.loading = false;
        state.attributes = [...state.attributes, action.payload];
      })
      .addCase(addAttribute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch attributes";
      })

      // add attribute
      .addCase(updateAttribute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAttribute.fulfilled, (state, action: PayloadAction<AttributeType>) => {
        state.loading = false;
        const findIndex = state.attributes.findIndex((a) => a._id == action.payload._id);
        state.attributes[findIndex] = action.payload;
      })
      .addCase(updateAttribute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch attributes";
      })

      // delete attribute
      .addCase(deleteAttribute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAttribute.fulfilled, (state, action: PayloadAction<string>) => {
        console.log("delete action", action.payload, state.attributes);
        state.loading = false;
        state.attributes = state.attributes.filter((p) => p._id !== action.payload);
      })
      .addCase(deleteAttribute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch attributes";
      });
  },
});

export const { reset } = attributeSlice.actions;
export default attributeSlice.reducer;
