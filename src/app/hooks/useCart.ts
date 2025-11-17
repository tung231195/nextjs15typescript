"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { addTocart, updateTocart, removeItem, setShippingMethod } from "../store/slices/cartSlice";
import { CartItem } from "../types";

const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const carts = useSelector((state: RootState) => state.cart.carts);

  const subTotalPrice =
    carts && carts.length > 0 && carts.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQty = carts && carts.length > 0 && carts.reduce((sum, item) => sum + item.quantity, 0);

  const shippingPrice = useSelector((state: RootState) => state.cart.shippingFee);
  const totalPrice = +subTotalPrice + shippingPrice;
  // chỉ gọi dispatch khi cần
  const add = (item: CartItem) => dispatch(addTocart(item));
  const update = (item: CartItem) => dispatch(updateTocart(item));
  const remove = (id: string) => dispatch(removeItem(id));
  const changeShipping = (method: "ghn" | "ghtk" | "vnpost" | "grab" | "manual", fee: number) => {
    dispatch(setShippingMethod({ method, fee }));
  };

  return {
    shippingMethod: "ghn",
    shippingFee: shippingPrice,
    cartItems: carts,
    subTotalPrice,
    totalPrice,
    totalQty,
    add,
    update,
    remove,
    setShipping: changeShipping,
  };
};

export default useCart;
