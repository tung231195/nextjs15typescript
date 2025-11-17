import { ProductType } from "@/app/types";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
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
      <CardActionArea component="div" sx={{ display: "flex", justifyContent: "space-between" }}>
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
          <Box>{product.endDate ? new Date(product.endDate).toLocaleString() : "—"}</Box>

          {product.endDate && <TimerCountDown endDate={new Date(product.endDate)} />}
        </CardContent>
        <Button variant="outlined">Add to cart</Button>
      </CardActionArea>
    </Card>
  );
};

export default ProductSaleItem;
