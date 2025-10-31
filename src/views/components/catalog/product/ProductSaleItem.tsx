import { ProductType } from "@/app/types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import TimerCountDown from "../../TimerCounDown";

type TPropSaleItem = {
  product: ProductType;
};
const ProductSaleItem = ({ product }: TPropSaleItem) => {
  return (
    <Card>
      <CardMedia sx={{ height: 240 }} image={product.images?.[0] || ""} title={product.name} />
      <CardContent>
        <Typography variant="body1">{product.name}</Typography>
        <Typography
          variant="body1"
          sx={{ textDecoration: product.discount?.value > 0 ? "linethroud" : "none" }}
        >
          {product.price}
        </Typography>
        {product.discount?.value > 0 && (
          <>
            <Typography variant="body1" color="error">
              {product.finalPrice}
            </Typography>
            <Chip sx={{ position: "absolute", top: 0, left: 0 }} />
          </>
        )}
        <TimerCountDown endDate={new Date("2025/11/1")} />
      </CardContent>
      <CardActions>
        <Button variant="outlined">Add to cart</Button>
      </CardActions>
    </Card>
  );
};

export default ProductSaleItem;
