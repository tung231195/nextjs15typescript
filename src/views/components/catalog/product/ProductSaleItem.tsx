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
import PriceFormat from "../Price";
import { useLocale } from "next-intl";
import Link from "next/link";
import { generateProductLink } from "@/app/utils";

type TPropSaleItem = {
  product: ProductType;
};

const ProductSaleItem = ({ product }: TPropSaleItem) => {
  const locale = useLocale();

  const categorySlug =
    typeof product.category === "object" ? (product.category.slug as string) : product.category;
  const productSlug = product.slug as string;

  const productLink = generateProductLink({ locale, categorySlug, productSlug });
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 3,
        position: "relative",
        transition: "0.25s",
        "&:hover": { boxShadow: 6, transform: "translateY(-4px)" },
      }}
    >
      {/* Image */}
      <Link href={productLink}>
        <CardMedia
          sx={{ height: 240, objectFit: "cover", cursor: "pointer" }}
          image={product.images?.[0] || ""}
          title={product.name}
        />
      </Link>

      {/* Discount Badge */}
      {product.discount?.value > 0 && (
        <Chip
          label={
            product.discount.type === "percent"
              ? `-${product.discount.value}%`
              : `-${product.discount.value}$`
          }
          color="error"
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            fontSize: "0.8rem",
            fontWeight: 700,
            zIndex: 10,
          }}
        />
      )}

      <CardActionArea component="div" sx={{ p: 2, display: "flex", gap: 2 }}>
        {/* Content */}
        <CardContent sx={{ flex: 1, p: 0 }}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5 }}>
            {product.name}
          </Typography>

          {/* Old price (strikethrough) */}
          {product.discount?.value > 0 && (
            <PriceFormat amount={product.price} saleAmount={product.discount} locale={locale} />
          )}

          {/* Sale description */}
          <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
            Ends at: {product.endDate ? new Date(product.endDate).toLocaleString() : "Unknown"}
          </Typography>

          {/* Countdown */}
          {product.endDate && (
            <Box sx={{ mt: 1 }}>
              <TimerCountDown endDate={new Date(product.endDate)} />
            </Box>
          )}
        </CardContent>

        {/* Add to cart button */}
        <Button
          variant="outlined"
          sx={{
            alignSelf: "center",
            whiteSpace: "nowrap",
            height: 40,
            borderRadius: 2,
          }}
        >
          Add to cart
        </Button>
      </CardActionArea>
    </Card>
  );
};

export default ProductSaleItem;
