import useCart from "@/app/hooks/useCart";
import { CartItem } from "@/app/types";
import { Avatar, Card, CardContent, IconButton, TextField, Typography } from "@mui/material";
import { GridDeleteIcon } from "@mui/x-data-grid";

type TPropsCart = {
  product: CartItem;
};
const CartItemTemplate = (props: TPropsCart) => {
  const { product } = props;
  const { remove } = useCart();
  return (
    <Card sx={{ mb: 2, display: "flex", alignItems: "center" }}>
      <Avatar
        src={product.image || "/placeholder.png"}
        alt={product.name}
        sx={{ width: 80, height: 80, ml: 2 }}
        variant="rounded"
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{product.name}</Typography>
        <Typography color="text.secondary">${product.price}</Typography>
        <TextField size="small" type="number" value={product.quantity} sx={{ width: 70, mt: 1 }} />
      </CardContent>
      <IconButton onClick={() => remove(product.product)}>
        <GridDeleteIcon />
      </IconButton>
    </Card>
  );
};
export default CartItemTemplate;
