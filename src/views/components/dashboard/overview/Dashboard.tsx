"use client";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { overviews } from "./config";
import { Icon } from "@iconify/react";
import OrderOverView from "./Orders";
import OrderLineChart from "./OrderLineChart";
import OrderBestSellingChart from "./OrderBestSellingChart";
import OrderRecent from "./OrderRecent";
import { useEffect, useState } from "react";
import { getOrdertViews } from "@/app/services/orderService";

export default function DashboardOverView() {
  const [orders, setOrders] = useState<Record<string, number>>();
  useEffect(() => {
    const fetchOrderView = async () => {
      const res = await getOrdertViews();

      setOrders(res.data);
    };
    fetchOrderView();
  }, []);
  return (
    <>
      <Grid container spacing={2}>
        {overviews.map((item, index) => (
          <Grid size={{ md: 4, xs: 12, sm: 6, lg: 2.4 }} key={index}>
            <Card sx={{ background: item.color, color: "#ffffff", padding: 2, minHeight: 200 }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Icon icon={item.icon} fontSize={30} />
                  <Typography variant="h6" ml={1}>
                    {item.title}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="subtitle1">{item.total}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      gap: 2,
                    }}
                  >
                    <Typography variant="body2">Cash: {item.cash}</Typography>
                    <Typography variant="body2">Card: {item.card}</Typography>
                    <Typography variant="body2">Credit: {item.credit}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {orders && <OrderOverView orders={orders} />}
      <Grid container mt={2}>
        <Grid size={{ md: 6, lg: 6 }}>
          <OrderLineChart />
        </Grid>
        <Grid size={{ md: 6, lg: 6 }}>
          <OrderBestSellingChart />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <OrderRecent />
      </Grid>
    </>
  );
}
