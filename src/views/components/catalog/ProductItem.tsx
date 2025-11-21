"use client";
import { ATTRIBUTE_COLOR_ID, ATTRIBUTE_SIZE_ID, CartItem, ProductType } from "@/app/types";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Box, Button, CardActions, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import useCart from "@/app/hooks/useCart";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { generateProductLink, groupColorBySize } from "@/app/utils";
import { useLocale } from "next-intl";
import PriceFormat from "./Price";

type TPropProductItem = {
  product: ProductType;
};

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
    setTimeout(() => {
      const miniCartEl = document.getElementById("mini-cart");
      if (miniCartEl) {
        miniCartEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 50);
  };
  const locale = useLocale();

  const categorySlug =
    typeof product.category === "object" ? (product.category.slug as string) : product.category;
  const productSlug = product.slug as string;

  const productLink = generateProductLink({ locale, categorySlug, productSlug });
  console.log("product link", locale, categorySlug, productSlug, productLink);
  const handleProductPage = (id: string) => router.push(productLink);
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
      transition={{ type: "spring", stiffness: 180 }}
      sx={{
        maxWidth: 345,
        mt: 2,
        position: "relative",
        overflow: "hidden",
        borderRadius: "20px",
        boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
        bgcolor: "#fff",
        cursor: "pointer",
        "&:hover .action": {
          bottom: 0,
          opacity: 1,
        },
      }}
    >
      {/* Image */}
      <CardMedia
        onClick={() => handleProductPage(product._id)}
        sx={{
          height: 240,
          cursor: "pointer",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          transition: "transform 0.35s ease",
          "&:hover": {
            transform: "scale(1.04)",
          },
        }}
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
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            fontSize: "0.75rem",
            fontWeight: 600,
            borderRadius: "8px",
          }}
        />
      )}

      <Chip
        label="New"
        color="primary"
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          fontSize: "0.75rem",
          fontWeight: 600,
          borderRadius: "8px",
        }}
      />

      {/* Content */}
      <CardContent sx={{ textAlign: "center", p: 2, minHeight: 150 }}>
        <Typography
          gutterBottom
          variant="h6"
          fontWeight={700}
          sx={{ mb: 1, fontSize: "1.05rem", minHeight: 48 }}
        >
          {product.name}
        </Typography>

        {/* Color options */}

        {variantAtt.length > 0 && (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "center",
              mb: 1.5,
              minHeight: "40px", // bắt buộc để giữ layout khi có màu
              alignItems: "center",
            }}
          >
            {variantAtt.map((v) => (
              <Box
                key={v.color}
                onClick={() => handeChangeAtt(v.color)}
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: v.color,
                  border: "2px solid #fff",
                  boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                  transition: "0.25s",
                }}
              />
            ))}
          </Box>
        )}
        {/* Size */}
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center", mb: 1 }}>
          {listSize?.map((ls, i) => (
            <Button
              key={i}
              onClick={() => handleOnSize(ls)}
              sx={{
                minWidth: 34,
                height: 34,
                borderRadius: "10px",
                bgcolor: "grey.900",
                color: "#fff",
                fontSize: "0.75rem",
                padding: 0,
                "&:hover": { bgcolor: "grey.700" },
              }}
            >
              {ls}
            </Button>
          ))}
        </Box>

        {/* Prices */}

        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "center",
            mt: 1,
            height: "32px", // ⭐ CỐ ĐỊNH CHỖ GIÁ
            alignItems: "center",
          }}
        >
          <PriceFormat amount={product.price} saleAmount={product.discount} locale={locale} />
        </Box>
      </CardContent>

      {/* Actions */}
      <CardActions
        className="action"
        sx={{
          position: "absolute",
          bottom: "-250px",
          left: 0,
          width: "100%",
          display: "flex",
          gap: 1,
          p: 1.5,
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          bgcolor: "rgba(255,255,255,0.90)",
          backdropFilter: "blur(10px)",
          transition: "all .35s ease",
          opacity: 0,
        }}
      >
        <Button
          fullWidth
          onClick={() => handleAddToCart(product)}
          sx={{
            bgcolor: "black",
            color: "white",
            borderRadius: "12px",
            "&:hover": { bgcolor: "#333" },
          }}
        >
          <Icon icon="flowbite:cart-outline" width={22} height={22} />
        </Button>

        <Button
          fullWidth
          sx={{
            bgcolor: "grey.300",
            borderRadius: "12px",
            "&:hover": { bgcolor: "grey.400" },
          }}
        >
          <Icon icon="flowbite:heart-outline" width={22} height={22} />
        </Button>

        <Button
          fullWidth
          sx={{
            bgcolor: "grey.300",
            borderRadius: "12px",
            "&:hover": { bgcolor: "grey.400" },
          }}
        >
          <Icon icon="lets-icons:view-light" width={22} height={22} />
        </Button>
      </CardActions>
    </MotionCard>
  );
};

export default ProductItem;
