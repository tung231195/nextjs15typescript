import { Middleware, PayloadAction } from "@reduxjs/toolkit";
import { syncCartAction } from "../../slices/cartSlice";
import { AppDispatch } from "../..";

const synCarts: Middleware = (store) => (next) => (action) => {
  console.log("Dispatching:", action);
  const result = next(action); // cho action đi tiếp
  const state = store.getState();
  const { cart } = state;
  if (["cart/addTocart", "cart/removeItem"].includes((action as PayloadAction).type)) {
    (store.dispatch as AppDispatch)(syncCartAction(cart.carts));
  }
  //store.dispatch(syncCartAction(cart.carts));
  console.log("Next state:", state, store.getState());
  return result;
};

export default synCarts;
