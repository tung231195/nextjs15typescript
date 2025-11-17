"use client";
import { Box, Typography } from "@mui/material";
import { OrderItem } from "@/app/types";

export default function ShippingInfo({ order }: { order: OrderItem }) {
  const { address, city, postalCode, country } = order.shippingAddress;

  return (
    <Box>
      <Typography variant="h6">Shipping Address</Typography>
      <Typography>Name</Typography>
      <Typography>
        {address}, {city}, {postalCode}, {country}
      </Typography>

      {typeof order.user === "object" && (
        <>
          <Typography mt={1}>Customer: {order.user.name}</Typography>
          <Typography>Email: {order.user.email}</Typography>
        </>
      )}
    </Box>
  );
}
