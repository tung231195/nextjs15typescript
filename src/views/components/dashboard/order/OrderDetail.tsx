"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Divider,
} from "@mui/material";
import dayjs from "dayjs";
import { OrderItem } from "@/app/types";
import { getOrdertService } from "@/app/services/orderService";

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchOrder = async () => {
      const res = await getOrdertService(id as string);
      setOrder(res?.data ?? null);
      setLoading(false);
    };
    fetchOrder();
  }, [id]);

  if (loading)
    return (
      <Box className="flex justify-center items-center min-h-[60vh]">
        <CircularProgress />
      </Box>
    );

  if (!order) return <Typography textAlign="center">Order not found</Typography>;

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
    <Box sx={{ p: { xs: 2, md: 5 }, bgcolor: "#f9fafc", minHeight: "100vh" }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700}>
          🧾 Order Detail
        </Typography>
        <Typography color="text.secondary">
          Reference: <strong>{order.reference}</strong>
        </Typography>
      </Box>

      {/* Info section */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid #e0e0e0",
              bgcolor: "white",
              p: 1,
              transition: "0.2s",
              "&:hover": { boxShadow: 4 },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                📋 Order Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography>
                <strong>Date:</strong> {dayjs(order.createdAt).format("DD/MM/YYYY HH:mm")}
              </Typography>
              <Typography>
                <strong>Payment Method:</strong> {order.paymentMethod}
              </Typography>
              <Typography>
                <strong>Items Price:</strong> ${order.itemsPrice.toFixed(2)}
              </Typography>
              <Typography>
                <strong>Shipping Price:</strong> ${order.shippingPrice.toFixed(2)}
              </Typography>
              <Typography>
                <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
              </Typography>

              <Box mt={2}>
                <Chip
                  label={order.status ?? "pending"}
                  color={color}
                  variant="filled"
                  sx={{ fontWeight: 600 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid #e0e0e0",
              bgcolor: "white",
              p: 1,
              transition: "0.2s",
              "&:hover": { boxShadow: 4 },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                📦 Shipping Address
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography fontWeight={600}>{order.shippingAddress.fullName}</Typography>
              <Typography color="text.secondary">
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </Typography>

              {typeof order.user === "object" && (
                <Box mt={2}>
                  <Typography>
                    <strong>Customer:</strong> {order.user.name}
                  </Typography>
                  <Typography color="text.secondary">
                    <strong>Email:</strong> {order.user.email}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Ordered items */}
      <Card
        elevation={0}
        sx={{
          mt: 5,
          borderRadius: 3,
          border: "1px solid #e0e0e0",
          bgcolor: "white",
          transition: "0.2s",
          "&:hover": { boxShadow: 4 },
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            🛍️ Ordered Items
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={0}>
            <Table size="small">
              <TableHead sx={{ backgroundColor: "#f5f7fa" }}>
                <TableRow>
                  <TableCell>
                    <strong>Product</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Qty</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Price</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Total</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.items.map((item, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      "&:hover": { backgroundColor: "#f9f9f9" },
                      transition: "0.2s",
                    }}
                  >
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                    <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </CardContent>
      </Card>

      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 6, opacity: 0.7 }}
      >
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </Typography>
    </Box>
  );
}
