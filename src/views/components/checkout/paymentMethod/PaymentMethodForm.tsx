import { PaymentMethodType } from "@/app/types";
import { Box, Button, CardMedia, Typography, Paper } from "@mui/material";

type TPropPaymentMethod = {
  paymentMethod?: PaymentMethodType;
  paymentMethods: PaymentMethodType[];
  handlePaymentMethod: (_id: string) => void;
  handleConfirmPaymentMethod: () => void;
  qrcode: string;
};

const PaymentMethodForm = ({
  paymentMethod,
  paymentMethods,
  handlePaymentMethod,
  handleConfirmPaymentMethod,
  qrcode,
}: TPropPaymentMethod) => {
  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, bgcolor: "background.paper", borderRadius: 3, boxShadow: 3 }}>
      {/* Title */}
      <Typography variant="h6" fontWeight={600} mb={2}>
        Choose Payment Method
      </Typography>

      {/* Payment Options */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4 }}>
        {paymentMethods &&
          paymentMethods.length > 0 &&
          paymentMethods.map((s) => (
            <Button
              key={s._id}
              onClick={() => handlePaymentMethod(s._id)}
              variant={paymentMethod?._id === s._id ? "contained" : "outlined"}
              color="primary"
              sx={{
                px: 3,
                py: 1.5,
                fontWeight: 600,
                textTransform: "uppercase",
                transition: "0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                },
              }}
            >
              {s.method}
            </Button>
          ))}
      </Box>

      {/* Selected Payment */}
      {paymentMethod && (
        <Paper sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: "grey.100" }}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            Selected Payment Method
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Typography>{paymentMethod.method}</Typography>
            <Typography>{paymentMethod.amount}</Typography>
            {qrcode && (
              <CardMedia
                sx={{
                  height: 80,
                  width: 80,
                  borderRadius: 1,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
                image={qrcode}
              />
            )}
          </Box>
        </Paper>
      )}

      {/* Actions */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" color="inherit">
          Back
        </Button>
        <Button onClick={handleConfirmPaymentMethod} variant="contained" color="primary">
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentMethodForm;
