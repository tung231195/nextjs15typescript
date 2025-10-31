"use client";
import ProductItem from "./ProductItem";
import { Grid, Typography } from "@mui/material";
import { ProductType } from "@/app/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
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
      <Typography variant="h6" fontWeight={600}>
        Product List
      </Typography>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        breakpoints={{
          320: { slidesPerView: 1 }, // mobile
          640: { slidesPerView: 2 }, // tablet nhỏ
          1024: { slidesPerView: 3 }, // laptop
          1280: { slidesPerView: 4 }, // desktop lớn
        }}
        className="rounded-2xl overflow-hidden shadow-lg"
      >
        {products && products.length > 0 ? (
          products.map((product) => {
            return (
              <SwiperSlide key={product._id}>
                <ProductItem product={product} />
              </SwiperSlide>
            );
          })
        ) : (
          <Typography>The Product List is emty</Typography>
        )}
      </Swiper>
    </>
  );
};

export default ProductList;
