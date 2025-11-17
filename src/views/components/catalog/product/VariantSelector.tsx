"use client";
import { ProductType, ProductVariant } from "@/app/types";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type TPropVariant = {
  product: ProductType;
  onVariantChange: (variant: ProductVariant) => void;
};

const VariantSelector = ({ product, onVariantChange }: TPropVariant) => {
  const variants = product?.variants || [];

  const colorID = "68e63089de8746d605fde99d";
  const sizeID = "68e7c88af04ba84b032132e7";

  // 🧠 State để lưu color đang chọn
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  // 🗺️ Tạo mapping color → list size
  const colorSizeMap: Record<string, Set<string>> = {};

  useEffect(() => {
    if (!selectedColor || !selectedSize) return;

    const foundVariant = variants.find((v) => {
      const colorAttr = v.attributes.find((a) => a.attribute === colorID);
      const sizeAttr = v.attributes.find((a) => a.attribute === sizeID);

      return colorAttr?.valueString === selectedColor && sizeAttr?.valueString === selectedSize;
    });

    if (foundVariant) {
      onVariantChange(foundVariant);
    }
  }, [selectedColor, selectedSize, variants, colorID, sizeID, onVariantChange]);

  variants.forEach((variant) => {
    const colorAttr = variant.attributes.find((a) => a.attribute === colorID);
    const sizeAttr = variant.attributes.find((a) => a.attribute === sizeID);

    const color = colorAttr?.valueString;
    const size = sizeAttr?.valueString;

    if (typeof color === "string" && typeof size === "string") {
      if (!colorSizeMap[color]) colorSizeMap[color] = new Set();
      colorSizeMap[color].add(size);
    }
  });
  // ✨ Chuyển thành mảng dễ render
  const variantData = Object.entries(colorSizeMap).map(([color, sizes]) => ({
    color,
    sizes: Array.from(sizes),
  }));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography fontWeight="bold">Color:</Typography>

      <Box sx={{ display: "flex", gap: 1 }}>
        {variantData.map(({ color }) => (
          <Button
            key={color}
            variant={selectedColor === color ? "contained" : "outlined"}
            onClick={() => setSelectedColor((prev) => (prev === color ? null : color))}
            sx={{
              border: "1px solid #ddd",
              display: "block",
              borderRadius: "50%",
              textTransform: "capitalize",
              zIndex: 9999,
              background: color,
              width: "30px",
              height: "30px",
              minWidth: "30px",
            }}
          ></Button>
        ))}
      </Box>

      {selectedColor && (
        <Box>
          <Typography fontWeight="bold">Size ({selectedColor}):</Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            {variantData
              .find((v) => v.color === selectedColor)
              ?.sizes.map((size) => (
                <Button
                  onClick={() => setSelectedSize(size)}
                  key={size}
                  variant={selectedSize === size ? "contained" : "outlined"}
                >
                  {size}
                </Button>
              ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default VariantSelector;
