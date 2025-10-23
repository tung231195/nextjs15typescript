import { DeliveryMethodType } from "@/app/types";
import { Icon } from "@iconify/react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
type TPropShippingMethod = {
  handleChangeDelivery: () => void;
  shippingMethod?: DeliveryMethodType;
};
const ShippingMethod = ({ handleChangeDelivery, shippingMethod }: TPropShippingMethod) => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={{ md: 5, sm: 12 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body1">Message</Typography>
            <TextField name="message" placeholder="note for seller" />
          </Box>
        </Grid>
        <Grid size={{ md: 7, sm: 12 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6">Delivery Method: {shippingMethod?.method}</Typography>
            <Box>
              <Icon icon="mdi:truck-delivery-outline" fontSize={22} />
              <Typography>Nhận từ 18 Th10 - 20 Th10</Typography>
            </Box>
            <Button onClick={handleChangeDelivery}>change</Button>
            <Typography variant="h6">{shippingMethod?.shippingFee}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShippingMethod;
