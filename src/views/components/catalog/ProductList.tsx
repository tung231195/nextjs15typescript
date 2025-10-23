"use client";
import { AppDispatch, RootState } from "@/app/store";
import { fetchProducts } from "@/app/store/actions/product";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import { Grid } from "@mui/material";

const ProductList = () => {
  const products = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <Grid container>
        {products &&
          products.map((product) => {
            return (
              <Grid key={product._id} size={{ md: 3, sm: 1, xs: 12, xl: 3 }}>
                <ProductItem product={product} />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default ProductList;
