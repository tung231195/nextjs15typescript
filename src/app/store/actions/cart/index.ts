import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk Actions

/** Add Cart to server */
export const syncCarts = createAsyncThunk("cart/syncCarts", async () => {
  return;
});
