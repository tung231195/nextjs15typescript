"use client";
import ProductItem from "./ProductItem";
import { Grid, Typography } from "@mui/material";
import { ProductType } from "@/app/types";
type TPropProductList = {
  products: ProductType[];
};
const ProductList = (props: TPropProductList) => {
  //const products = useSelector((state: RootState) => state.product.products);
  const { products } = props;
  // const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);
  return (
    <>
      <Grid container>
        {products && products.length > 0 ? (
          products.map((product) => {
            return (
              <Grid key={product._id} size={{ md: 3, sm: 1, xs: 12, xl: 3 }}>
                <ProductItem product={product} />
              </Grid>
            );
          })
        ) : (
          <Typography>The Product List is emty</Typography>
        )}
      </Grid>
    </>
  );
};

export default ProductList;
