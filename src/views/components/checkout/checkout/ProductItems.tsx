import { CartItem } from "@/app/types";
import { Box, CardMedia, Grid, Typography } from "@mui/material";
type TPropProductItems = {
  cartItems: CartItem[];
};
const ProductItems = ({ cartItems }: TPropProductItems) => {
  return (
    <Box>
      <Grid container>
        <Grid size={{ md: 6, sm: 12 }}>
          <Typography variant="h6" gutterBottom>
            Items
          </Typography>
        </Grid>
        <Grid size={{ md: 2, sm: 12 }}>
          <Typography variant="h6" gutterBottom>
            Price
          </Typography>
        </Grid>
        <Grid size={{ md: 2, sm: 12 }}>
          <Typography variant="h6" gutterBottom>
            Quantity
          </Typography>
        </Grid>
        <Grid size={{ md: 2, sm: 12 }}>
          <Typography variant="h6" gutterBottom>
            Total
          </Typography>
        </Grid>
      </Grid>
      {cartItems &&
        cartItems.map((product) => {
          return (
            <Grid
              sx={{ borderBottom: "1px solid #ccc" }}
              key={product.product}
              container
              spacing={2}
              alignItems={"center"}
              mt={2}
              p={2}
            >
              <Grid size={{ md: 6, sm: 12 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <CardMedia sx={{ height: 80, width: 80 }} image={product.image} />
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ md: 2, sm: 12 }}>
                <Typography variant="h6" gutterBottom>
                  {product.price}
                </Typography>
              </Grid>
              <Grid size={{ md: 2, sm: 12 }}>
                <Typography variant="h6" gutterBottom>
                  {product.quantity}
                </Typography>
              </Grid>
              <Grid size={{ md: 2, sm: 12 }}>
                <Typography variant="h6" gutterBottom>
                  {product.price * product.quantity}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
    </Box>
  );
};

export default ProductItems;
