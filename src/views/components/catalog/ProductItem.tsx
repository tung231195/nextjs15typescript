"use client";
import { CartItem, ProductType } from "@/app/types";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Box, Button, CardActions, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import useCart from "@/app/hooks/useCart";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { groupColorBySize } from "@/app/utils";

type TPropProductItem = {
  product: ProductType;
};

const ATTRIBUTE_COLOR_ID = "68e63089de8746d605fde99d";
const ATTRIBUTE_SIZE_ID = "68e7c88af04ba84b032132e7";

const ProductItem = ({ product }: TPropProductItem) => {
  const MotionCard = motion(Box);
  const { add } = useCart();
  const router = useRouter();

  /** Add to Cart */
  const handleAddToCart = (product: ProductType) => {
    const payload: CartItem = {
      product: product._id,
      name: product.name,
      quantity: 1,
      price: product.price,
      image: product.images?.[0] || "",
    };
    add(payload);
  };

  const handleProductPage = (id: string) => router.push(`/catalog/product/${id}`);

  /** Sale logic */
  const isSale = product.discount?.value > 0;
  const variantPrices = product.variants?.map((v) => v.price) || [];
  const minPrice = variantPrices.length > 0 ? Math.min(...variantPrices) : product.price;

  /** Attribute mapping (color → sizes) */

  const [listSize, setListSize] = useState<string[]>([]);
  const variantAtt = groupColorBySize(product, ATTRIBUTE_COLOR_ID, ATTRIBUTE_SIZE_ID);
  const handeChangeAtt = (color: string) => {
    const sizes = variantAtt.find((v) => v.color == color);
    setListSize(sizes?.sizes ?? []);
  };
  const handleOnSize = (ls: string) => {
    console.log("ls", ls);
  };
  return (
    <MotionCard
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
      sx={{
        maxWidth: 345,
        mt: 2,
        position: "relative",
        overflow: "hidden",
        boxShadow: 2,
        "&:hover .action": {
          bottom: 0,
          opacity: 1,
        },
      }}
    >
      {/* Image */}
      <CardMedia
        onClick={() => handleProductPage(product._id)}
        sx={{ height: 240, cursor: "pointer" }}
        image={product.images?.[0] || ""}
        title={product.name}
      />

      {/* Badges */}
      {isSale && (
        <Chip
          label={
            product.discount.type === "percent"
              ? `-${product.discount?.value}%`
              : `-${product.discount?.value}$`
          }
          color="error"
          sx={{ position: "absolute", top: 10, left: 0 }}
        />
      )}
      <Chip label="New" color="primary" sx={{ position: "absolute", top: 10, right: 0 }} />

      {/* Content */}
      <CardContent sx={{ textAlign: "center" }}>
        <Typography gutterBottom variant="h6" fontWeight={600}>
          {product.name}
        </Typography>

        {/* Color options */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center", mb: 1 }}>
          {variantAtt.map((v) => (
            <Box
              onClick={() => handeChangeAtt(v.color)}
              key={v.color}
              sx={{
                border: "1px solid #ddd",
                display: "block",
                borderRadius: "50%",
                textTransform: "capitalize",
                zIndex: 9999,
                background: v.color,
                width: "30px",
                height: "30px",
              }}
            ></Box>
          ))}
        </Box>
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
          {listSize &&
            listSize.map((ls, i) => {
              return (
                <Button
                  onClick={() => handleOnSize(ls as string)}
                  key={i}
                  fullWidth
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    "&:hover": { bgcolor: "primary.dark" },
                    width: "30px",
                  }}
                >
                  <Typography sx={{ ml: 1 }}>{ls}</Typography>
                </Button>
              );
            })}
        </Box>
        {/* Prices */}
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
          <Typography
            sx={{ textDecoration: isSale ? "line-through" : "none" }}
            variant="subtitle1"
            fontWeight={700}
            color="primary"
          >
            ${product.price.toFixed(2)} - {minPrice.toFixed(2)}
          </Typography>
          {isSale && (
            <Typography variant="subtitle1" fontWeight={700} color="error">
              ${product.finalPrice?.toFixed(2)}
            </Typography>
          )}
        </Box>

        <Typography variant="body2" color="text.secondary" noWrap sx={{ mt: 1 }}>
          {product.description}
        </Typography>
      </CardContent>

      {/* Hover Actions */}
      <CardActions
        className="action"
        sx={{
          position: "absolute",
          bottom: "-250px",
          left: 0,
          width: "100%",
          display: "flex",
          gap: 1,
          bgcolor: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(6px)",
          opacity: 0,
          transition: "all 0.35s ease",
          p: 1.5,
        }}
      >
        <Button
          fullWidth
          onClick={() => handleAddToCart(product)}
          sx={{
            bgcolor: "grey.200",
            color: "white",
            "&:hover": { bgcolor: "primary.light" },
          }}
        >
          <Icon icon="flowbite:cart-outline" width={22} height={22} />
        </Button>

        <Button
          fullWidth
          sx={{
            bgcolor: "grey.200",
            "&:hover": { bgcolor: "grey.300" },
          }}
        >
          <Icon icon="flowbite:heart-outline" width={22} height={22} />
        </Button>

        <Button
          fullWidth
          sx={{
            bgcolor: "grey.200",
            "&:hover": { bgcolor: "grey.300" },
          }}
        >
          <Icon icon="lets-icons:view-light" width={22} height={22} />
        </Button>
      </CardActions>
    </MotionCard>
  );
};

export default ProductItem;
