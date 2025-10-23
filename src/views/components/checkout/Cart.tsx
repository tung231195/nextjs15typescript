"use client";
import * as React from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import useCart from "@/app/hooks/useCart";
import CartItemTemplate from "./CartItem";
import CartEmpty from "./CartEmpty";
import CartSummary from "./CartSummary";

export default function Cart() {
  // const router = useRouter();

  const { cartItems } = useCart();
  /*** hanldle  */
  console.log("cart data", cartItems);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        🛒 Giỏ hàng của bạn
      </Typography>
      <Divider sx={{ mb: 3 }} />
      {cartItems && cartItems.length === 0 ? (
        <CartEmpty />
      ) : (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((product) => {
                return <CartItemTemplate key={`cart_page${product.product}`} product={product} />;
              })}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>{<CartSummary />}</Grid>
        </Grid>
      )}
    </Box>
  );
}
