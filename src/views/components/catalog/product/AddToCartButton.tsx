"use client";

import { Button, Typography, Box } from "@mui/material";
import { useState } from "react";
import { ProductVariant, ProductAttributeValue } from "@/app/types";
import useCart from "@/app/hooks/useCart";

interface Props {
  variant: ProductVariant | null;
}

export default function AddToCartButton({ variant }: Props) {
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  const handleAdd = () => {
    if (!variant || !variant.sku || variant.price === undefined || !variant._id) return;

    const variantP: {
      name: string;
      quantity: number;
      price: number;
      product: string;
      attributes: ProductAttributeValue[];
      image: string;
    } = {
      name: variant.sku,
      quantity: 1,
      price: variant.price,
      product: variant._id,
      attributes: variant.attributes,
      image: "", // map image nếu có
    };

    add(variantP);

    // Show message ngay button
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Box sx={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ borderRadius: 2 }}
        onClick={handleAdd}
        disabled={!variant}
      >
        Add to Cart
      </Button>

      {added && (
        <Typography variant="caption" color="success.main">
          Added to cart!
        </Typography>
      )}
    </Box>
  );
}
