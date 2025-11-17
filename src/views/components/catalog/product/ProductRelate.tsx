import { getProductsRelate } from "@/app/services/productService";
import { ProductType } from "@/app/types";
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ProductItem from "../ProductItem";

const ProductRelate = ({ category, id }: { category: string; id: string }) => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProductsRelate(id, category);
      setProducts(res);
    };
    fetchProducts();
  }, [category]);
  return (
    <>
      <Typography variant="h6">Product Relates</Typography>
      <Grid container>
        {products &&
          products.map((product) => {
            return (
              <Grid key={product._id} size={{ md: 3, xs: 6 }}>
                <ProductItem product={product} key={product._id} />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default ProductRelate;
