"use client";
import { getProductService } from "@/app/services/productService";
import { ProductType, ProductVariant } from "@/app/types";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductGallery from "./ProductGallery";
import VariantSelector from "./VariantSelector";
import AddToCartButton from "./AddToCartButton";

const ProductDetail = () => {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState<ProductType>();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  useEffect(() => {
    const fetProduct = async () => {
      const res = await getProductService(id as string);

      setProduct(res);
    };
    fetProduct();
  }, [id]);
  console.log("product detail", product);

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* Left: Image gallery */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ProductGallery images={product?.images} />
        </Grid>

        {/* Right: Info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" fontWeight={600}>
            {product?.name}
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
            ${product?.price.toFixed(2)}
          </Typography>

          <Typography variant="body1" sx={{ mt: 3, mb: 4 }}>
            {product?.description}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <VariantSelector product={product} onVariantChange={setSelectedVariant} />

          {selectedVariant && (
            <Typography variant="h6" sx={{ mt: 2 }}>
              Price: ${selectedVariant.price.toFixed(2)}
            </Typography>
          )}

          <AddToCartButton variant={selectedVariant} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;
