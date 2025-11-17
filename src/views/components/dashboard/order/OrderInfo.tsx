"use client";
import { Box, Chip, Typography } from "@mui/material";
import dayjs from "dayjs";
import { OrderItem } from "@/app/types";

export default function OrderInfo({ order }: { order: OrderItem }) {
  let color: "warning" | "info" | "success" | "error" = "warning";
  switch (order.status) {
    case "processing":
      color = "info";
      break;
    case "delivered":
      color = "success";
      break;
    case "cancel":
      color = "error";
      break;
  }

  return (
    <Box>
      <Typography variant="h6">Order Information</Typography>
      <Typography>Date: {dayjs(order.createdAt).format("DD/MM/YYYY HH:mm")}</Typography>
      <Typography>Payment Method: {order.paymentMethod}</Typography>
      <Typography>Items Price: ${order.itemsPrice}</Typography>
      <Typography>Shipping Price: ${order.shippingPrice}</Typography>
      <Typography>Total Price: ${order.totalPrice}</Typography>
      <Box mt={1}>
        <Chip label={order.status} color={color} size="small" />
      </Box>
    </Box>
  );
}
