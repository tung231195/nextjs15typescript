import { DeliveryMethodType } from "@/app/types";
import { Box, Button, Typography, Paper } from "@mui/material";

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
  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, bgcolor: "background.paper", borderRadius: 3, boxShadow: 3 }}>
      {/* Title */}
      <Typography variant="h6" fontWeight={600} mb={2}>
        Choose Delivery Method
      </Typography>

      {/* Shipping Options */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4 }}>
        {shippingMethods &&
          shippingMethods.length > 0 &&
          shippingMethods.map((s) => (
            <Button
              key={s._id}
              onClick={() => handleMethod(s._id)}
              variant={shippingMethod?._id === s._id ? "contained" : "outlined"}
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

      {/* Selected Shipping */}
      {shippingMethod && (
        <Paper sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: "grey.100" }}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            Selected Shipping Method
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>{shippingMethod.method}</Typography>
            <Typography>{shippingMethod.shippingFee}</Typography>
          </Box>
        </Paper>
      )}

      {/* Actions */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" color="inherit">
          Back
        </Button>
        <Button onClick={() => handleConfirmShippingMethod()} variant="contained" color="primary">
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default ShippingMethodForm;
