"use client";
import { ProductType } from "@/app/types";
import { Box, CardMedia, Grid, Typography } from "@mui/material";
import ProductSaleItem from "./product/ProductSaleItem";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useTranslations } from "next-intl";

type TPropSaleProduct = {
  productSale: ProductType[];
};
const ProductCountDown = ({ productSale }: TPropSaleProduct) => {
  const t = useTranslations("ProductCountDown");
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
            background: "linear-gradient(90deg, #ff4b2b, #ff416c)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t("promotionProducts")}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid size={{ md: 7 }}>
          <CardMedia
            sx={{ height: 425 }}
            image="/images/banner-thoi-trang-nu-3.jpg"
            title="dealer product"
          />
        </Grid>
        <Grid size={{ md: 5 }}>
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
              1024: { slidesPerView: 2 }, // laptop
              1280: { slidesPerView: 1 }, // desktop lớn
            }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            {productSale &&
              productSale.length > 0 &&
              productSale.map((product) => {
                return (
                  <SwiperSlide key={product._id}>
                    <ProductSaleItem product={product} />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductCountDown;
