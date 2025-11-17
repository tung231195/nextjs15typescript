"use client";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { LineChart } from "@mui/x-charts/LineChart";

const margin = { right: 24, left: 16, top: 16, bottom: 16 };

const pData = [5000, 1000, 15000, 2000, 25000, 30000];
const xLabels = [
  "2025-11-04",
  "2025-11-05",
  "2025-11-06",
  "2025-11-07",
  "2025-11-08",
  "2025-11-09",
];

export default function OrderLineChart() {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Weekly Sales
        </Typography>

        <Box sx={{ width: "100%", height: 300 }}>
          <LineChart
            series={[
              {
                data: pData,
                label: "Sales",
                color: "#00bfa5",
                showMark: true,
                curve: "linear", // 🔥 Đường thẳng giữa các điểm
              },
            ]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
            yAxis={[{ width: 60 }]}
            grid={{ horizontal: true }}
            margin={margin}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
