"use client";

import { Button, Snackbar } from "@mui/material";
import { useState } from "react";
import { ProductVariant, ProductAttributeValue } from "@/app/types";
import useCart from "@/app/hooks/useCart";

interface Props {
  variant: ProductVariant | null;
}

export default function AddToCartButton({ variant }: Props) {
  const [open, setOpen] = useState(false);
  const { add } = useCart();

  const handleAdd = () => {
    if (!variant || !variant.sku || variant.price === undefined || !variant._id) return;

    // Tạo object chắc chắn tất cả field required đều có giá trị
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
      image: "", // bạn có thể map image nếu có
    };

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
        disabled={!variant} // ✅ disable nếu variant null
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
