"use client";

import { Button, Snackbar } from "@mui/material";
import { useState } from "react";
import { ProductVariant } from "@/app/types";

import useCart from "@/app/hooks/useCart";

interface Props {
  variant: ProductVariant | null;
}

export default function AddToCartButton({ variant }: Props) {
  const [open, setOpen] = useState(false);
  const { add } = useCart();
  const handleAdd = () => {
    console.log("add to cart", variant);
    const variantP = {
      name: variant?.sku,
      quantity: 1,
      price: variant?.price,
      product: variant?._id,
      attributes: variant?.attributes,
      image: "",
    };
    if (!variant) return;
    add(variantP);
    setOpen(true);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ borderRadius: 2 }}
        onClick={handleAdd}
        // disabled={!variant}
      >
        Add to Cart
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={() => setOpen(false)}
        message="Added to cart!"
      />
    </>
  );
}
