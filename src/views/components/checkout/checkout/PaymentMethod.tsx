"use client";
import { PaymentMethodType } from "@/app/types";
import { Box, Button, CardMedia, Grid, Typography } from "@mui/material";

type TPropPaymentMethod = {
  handleChangePaymentMethod: () => void;
  paymentMethod?: PaymentMethodType;
  qrcode: string;
};

const PaymentMethod = ({
  handleChangePaymentMethod,
  paymentMethod,
  qrcode,
}: TPropPaymentMethod) => {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        p: 2,
        mb: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Grid container spacing={2} alignItems="center">
        {/* Cột thông tin thanh toán */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Payment Method
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {paymentMethod?.method || "No payment method selected"}
          </Typography>
        </Grid>

        {/* Cột hành động */}
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "flex-start", md: "flex-end" },
            gap: 2,
          }}
        >
          <CardMedia sx={{ height: 80, width: 80 }} image={qrcode as string} />
          <Typography variant="body2" color="text.secondary">
            Pay when receiving items
          </Typography>
          <Button
            onClick={handleChangePaymentMethod}
            variant="outlined"
            size="small"
            sx={{
              borderRadius: 3,
              textTransform: "none",
            }}
          >
            Change
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentMethod;
