import { Middleware } from "@reduxjs/toolkit";
import { syncCartAction } from "../../slices/cartSlice";

const synCarts: Middleware = (store) => (next) => (action) => {
  console.log("Dispatching:", action);
  const result = next(action); // cho action đi tiếp
  const state = store.getState();
  const { cart } = state;
  if (["cart/addTocart", "cart/removeItem"].includes((action as any).type)) {
    store.dispatch(syncCartAction(cart.carts));
  }
  //store.dispatch(syncCartAction(cart.carts));
  console.log("Next state:", store.getState());
  return result;
};

export default synCarts;
