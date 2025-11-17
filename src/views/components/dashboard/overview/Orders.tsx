"use client";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
type OrderStatic = {
  icon: string;
  title: string;
  total: number;
  color: string;
};
export default function OrderOverView({ orders }: { orders: Record<string, number> }) {
  const { total_orders, pending, processing, delivered } = orders;
  const orderStatics: OrderStatic[] = [
    {
      icon: "mdi:cart",
      title: "Total Order",
      total: total_orders,
      color: "red",
    },
    {
      icon: "fluent-mdl2:sync-status",
      title: "Orders Pending",
      total: pending,
      color: "green",
    },
    {
      icon: "fluent-mdl2:processing",
      title: "Orders Processing",
      total: processing,
      color: "yellow",
    },
    {
      icon: "iconamoon:delivery",
      title: "Orders Delivered",
      total: delivered,
      color: "blue",
    },
  ];
  return (
    <Grid container spacing={2} mt={4}>
      {orderStatics.map((item, index) => (
        <Grid size={{ md: 4, xs: 12, sm: 6, lg: 3 }} key={index}>
          <Card sx={{ background: "#ffffff" }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: item.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon icon={item.icon} fontSize={20} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="body1" ml={1}>
                    {item.title}
                  </Typography>
                  <Typography variant="h5" color="#000000">
                    {item.total}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
