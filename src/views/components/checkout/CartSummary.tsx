"use client";
import useCart from "@/app/hooks/useCart";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartSummary() {
  const [enableCheckout, setEnableCheckout] = useState<boolean>(true);
  const { cartItems, totalPrice, totalQty } = useCart();
  const route = useRouter();
  useEffect(() => {
    if (cartItems && cartItems.length > 0) setEnableCheckout(false);
  }, [cartItems]);

  // const hanldeCheckout = () => {
  //   console.log("hanle checkout", cartItems);
  //   const orderItem = {
  //     items: cartItems,
  //     shippingAddress: {
  //       fullName: "Nguyen Van B",
  //       address: "123 Đường ABC",
  //       city: "Hà Nội",
  //       postalCode: "10000",
  //       country: "VN",
  //     },
  //     paymentMethod: "COD",
  //     itemsPrice: 400,
  //     shippingPrice: 20,
  //     taxPrice: 10,
  //     totalPrice: 400,
  //   };
  //   dispatch(orderAction(orderItem));
  // };

  const hanldeCheckout1 = async () => {
    route.push("/checkout");
    // const res = await customAxios.post("http://localhost:5000/api/payment", { items: cartItems });
    // window.location.href = res.data.url; // chuyển hướng tới Stripe
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Tóm tắt đơn hàng
        </Typography>
        <Typography>Tổng sản phẩm: {totalQty}</Typography>
        <Typography>Tổng tiền: ${totalPrice}</Typography>

        <Box mt={2}>
          <Button disabled={enableCheckout} onClick={hanldeCheckout1} variant="contained" fullWidth>
            Thanh toán
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
