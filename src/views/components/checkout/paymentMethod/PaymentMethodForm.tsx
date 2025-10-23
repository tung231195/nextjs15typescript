import { PaymentMethodType } from "@/app/types";
import { Box, Button, Typography } from "@mui/material";

type TPropPaymentMethod = {
  paymentMethod?: PaymentMethodType;
  paymentMethods: PaymentMethodType[];
  handlePaymentMethod: (_id: string) => void;
  handleConfirmPaymentMethod: () => void;
};
const PaymentMethodForm = ({
  paymentMethod,
  paymentMethods,
  handlePaymentMethod,
  handleConfirmPaymentMethod,
}: TPropPaymentMethod) => {
  console.log(paymentMethod);
  return (
    <>
      <Typography variant="body1">Chose Delivery Method</Typography>
      {paymentMethods &&
        paymentMethods.length > 0 &&
        paymentMethods.map((s) => {
          return (
            <Button
              onClick={() => handlePaymentMethod(s._id)}
              sx={{ ml: 2 }}
              key={s._id}
              variant={s.method === paymentMethod?.method ? "outlined" : "contained"}
            >
              {s.method.toUpperCase()}
            </Button>
          );
        })}
      <Box>
        <Typography variant="h5">PHƯƠNG THỨC Thanh Toan LIÊN KẾT VỚI SHOPEE</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography>{paymentMethod?.method}</Typography>
          <Typography>{paymentMethod?.amount}</Typography>
        </Box>
      </Box>
      <Box>
        <Button variant="outlined">Back</Button>
        <Button onClick={() => handleConfirmPaymentMethod()} variant="outlined">
          Confirm
        </Button>
      </Box>
    </>
  );
};

export default PaymentMethodForm;
