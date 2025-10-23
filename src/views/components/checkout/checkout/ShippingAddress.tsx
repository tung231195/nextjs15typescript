import { AddressType } from "@/app/types";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
type TPropShippingAddress = {
  hanldeChangeAddress: () => void;
  addressDefault: AddressType;
};
const ShippingAddress = ({ hanldeChangeAddress, addressDefault }: TPropShippingAddress) => {
  console.log("aaaaaaaaaa", addressDefault);
  return (
    <Box>
      {/* Title */}
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Shipping Address
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2} alignItems="center">
        {/* User Info */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="subtitle1" fontWeight={500}>
            {addressDefault.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {addressDefault.phone}
          </Typography>
        </Grid>

        {/* Address */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography variant="body2" color="text.secondary">
            {addressDefault.province?.label}- {addressDefault.district?.label}-{" "}
          </Typography>
        </Grid>

        {/* Buttons */}
        <Grid
          size={{ xs: 12, md: 3 }}
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-start", md: "flex-end" },
            gap: 1,
          }}
        >
          {addressDefault && addressDefault._id && (
            <Button variant="contained" color="primary" size="small">
              Default
            </Button>
          )}
          <Button onClick={hanldeChangeAddress} variant="outlined" size="small">
            {addressDefault && addressDefault._id ? "Change" : "Add New Address"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShippingAddress;
