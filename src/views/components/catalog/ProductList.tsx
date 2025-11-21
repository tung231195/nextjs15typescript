"use client";
import ProductItem from "./ProductItem";
import { Box, Typography } from "@mui/material";
import { ProductType } from "@/app/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useTranslations } from "next-intl";
type TPropProductList = {
  products: ProductType[];
};
const ProductList = (props: TPropProductList) => {
  const t = useTranslations("IndexPage");

  const { products } = props;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 4,
          mb: 2,
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{
            background: "linear-gradient(90deg, #000, #000)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t("newProducts")}
        </Typography>
      </Box>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={false}
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
