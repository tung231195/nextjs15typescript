import { CartItem, OrderItem } from "@/app/types";
import customAxios from "@/app/utils/customAxious";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  carts: CartItem[];
  loading: boolean;
  error: string | null;
  shippingMethod: "ghn" | "ghtk" | "vnpost" | "grab" | "manual";
  shippingFee: number;
}

const initialState: CartState = {
  carts: [],
  shippingMethod: "ghn",
  shippingFee: 25000,
  loading: false,
  error: null,
};

/** add post */
export const addCartAction = createAsyncThunk("cart/addCartAction", async (payload: CartItem) => {
  const res = await customAxios.post("cart", payload);
  return res.data;
});

export const syncCartAction = createAsyncThunk("cart/syncCart", async (cartItems: CartItem[]) => {
  const res = await customAxios.post("cart/sync", cartItems);
  return res.data;
});

export const getCartAction = createAsyncThunk("cart/getcart", async () => {
  const res = await customAxios.get("cart/sync");
  console.log("get cart action", res.data);
  return res.data;
});

export const orderAction = createAsyncThunk("order/createOrder", async (orderItem: OrderItem) => {
  const res = await customAxios.post("orders", orderItem);
  console.log("get create order action", res.data);
  return res.data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: (state) => {
      state.carts = [];
      state.loading = false;
    },
    addTocart: (state, actions) => {
      const cloneCarts = state.carts?.length ? [...state.carts] : [];
      const exist = cloneCarts.find((c: CartItem) => c.product == actions.payload.product);
      if (exist) {
        exist.quantity += 1;
      } else {
        cloneCarts.push(actions.payload);
      }
      state.carts = cloneCarts;
    },
    updateTocart: (state, actions) => {
      const cloneCarts = [...state.carts];
      const exist = cloneCarts.find((c: CartItem) => c.product == actions.payload.product);
      if (exist) {
        exist.quantity += exist.quantity + actions.payload.quantity;
      }
      state.carts = cloneCarts;
    },
    removeItem: (state, actions) => {
      const cloneCarts = [...state.carts];
      const newCarts = cloneCarts.filter((p: CartItem) => {
        console.log(" p.product != actions.payload", p.product, actions.payload);
        return p.product != actions.payload;
      });
      console.log("new cartd", cloneCarts, newCarts, actions);
      state.carts = newCarts;
    },
    // ✅ Thêm reducer mới để cập nhật phương thức vận chuyển
    setShippingMethod: (
      state,
      action: PayloadAction<{ method: "ghn" | "ghtk" | "vnpost" | "grab" | "manual"; fee: number }>,
    ) => {
      state.shippingMethod = action.payload.method;
      state.shippingFee = action.payload.fee;
    },
  },
  extraReducers: (builder) => {
    builder
      // addCart
      .addCase(addCartAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCartAction.fulfilled, (state, action: PayloadAction<CartItem>) => {
        state.loading = false;
        state.carts = [...state.carts, action.payload];
      })
      .addCase(addCartAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch cartds";
      })
      //** syn cart */
      .addCase(syncCartAction.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        console.log("sync cart state", action);
        state.carts = action.payload; // backend có thể trả lại cart mới nhất
      })
      .addCase(getCartAction.fulfilled, (state, action) => {
        console.log("get cart", action);
        state.carts = action.payload; // backend có thể trả lại cart mới nhất
      })
      /** checkout  */
      .addCase(orderAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderAction.fulfilled, (state, action: PayloadAction<OrderItem>) => {
        state.loading = false;
        state.carts = [];
      })
      .addCase(orderAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch cartds";
      });
  },
});

export const { reset, addTocart, updateTocart, removeItem, setShippingMethod } = cartSlice.actions;
export default cartSlice.reducer;
