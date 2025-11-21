"use client";
import { getProductServiceBySlug } from "@/app/services/productService";
import { ProductType, ProductVariant } from "@/app/types";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductGallery from "./ProductGallery";
import VariantSelector from "./VariantSelector";
import AddToCartButton from "./AddToCartButton";
import ProductTabDetail from "./ProductTabDetail";
import ProductRelate from "./ProductRelate";
import PriceFormat from "../Price";
import { useLocale } from "next-intl";
import { htmlToText } from "@/app/utils";

const ProductDetail = () => {
  const params = useParams();
  const { productSlug } = params;
  const [product, setProduct] = useState<ProductType>();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  useEffect(() => {
    const fetProduct = async () => {
      const res = await getProductServiceBySlug(productSlug as string);

      setProduct(res);
    };
    fetProduct();
  }, [productSlug]);
  const categoryId =
    typeof product?.category === "object" ? product?.category._id : product?.category;
  const locale = useLocale();
  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* Left: Image gallery */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ProductGallery images={product?.images ? product?.images : []} />
        </Grid>

        {/* Right: Info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" fontWeight={600}>
            {product?.name}
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
            <PriceFormat amount={product?.price as number} locale={locale} />
          </Typography>

          <Typography variant="body1" sx={{ mt: 3, mb: 4 }}>
            {product?.description && htmlToText(product?.description)}
          </Typography>

          <Divider sx={{ my: 3 }} />
          {product && <VariantSelector product={product} onVariantChange={setSelectedVariant} />}

          {selectedVariant && (
            <Typography variant="h6" sx={{ mt: 2 }}>
              Price: ${selectedVariant.price.toFixed(2)}
            </Typography>
          )}

          <Box mt={2}>
            <AddToCartButton variant={selectedVariant} />
          </Box>
        </Grid>
      </Grid>
      <Box mt={2}> {product && <ProductTabDetail product={product} />}</Box>
      <Box mt={2}>
        {product && <ProductRelate id={product._id} category={categoryId as string} />}
      </Box>
    </Box>
  );
};

export default ProductDetail;
