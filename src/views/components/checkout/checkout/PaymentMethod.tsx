import { PaymentMethodType } from "@/app/types";
import { Box, Button, Grid, Typography } from "@mui/material";
type TPropPaymentMethod = {
  handleChangePaymentMethod: () => void;
  paymentMethod?: PaymentMethodType;
};
const PaymentMethod = ({ handleChangePaymentMethod }: TPropPaymentMethod) => {
  return (
    <Box>
      <Grid container>
        <Grid size={{ md: 8 }}>
          <Typography variant="body1">Payment method</Typography>
        </Grid>
        <Grid size={{ md: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>Checkout when get items</Typography>
            <Button onClick={() => handleChangePaymentMethod()} variant="outlined" size="small">
              Change
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentMethod;
