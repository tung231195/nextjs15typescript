import { DeliveryMethodType } from "@/app/types";
import { Box, Button, Typography } from "@mui/material";

type TPropDelivery = {
  shippingMethod?: DeliveryMethodType;
  shippingMethods: DeliveryMethodType[];
  handleMethod: (_id: string) => void;
  handleConfirmShippingMethod: () => void;
};
const ShippingMethodForm = ({
  shippingMethod,
  shippingMethods,
  handleMethod,
  handleConfirmShippingMethod,
}: TPropDelivery) => {
  console.log("shippingMethods", shippingMethods);
  return (
    <>
      <Typography variant="body1">Chose Delivery Method</Typography>
      {shippingMethods &&
        shippingMethods.length > 0 &&
        shippingMethods.map((s) => {
          return (
            <Button
              onClick={() => handleMethod(s._id)}
              sx={{ ml: 2 }}
              key={s._id}
              variant="contained"
            >
              {s.method.toUpperCase()}
            </Button>
          );
        })}
      <Box>
        <Typography variant="h5">PHƯƠNG THỨC VẬN CHUYỂN LIÊN KẾT VỚI SHOPEE</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography>{shippingMethod?.method}</Typography>
          <Typography>{shippingMethod?.shippingFee}</Typography>
        </Box>
      </Box>
      <Box>
        <Button variant="outlined">Back</Button>
        <Button onClick={() => handleConfirmShippingMethod()} variant="outlined">
          Confirm
        </Button>
      </Box>
    </>
  );
};

export default ShippingMethodForm;
