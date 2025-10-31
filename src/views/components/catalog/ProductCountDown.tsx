"use client";
import { ProductType } from "@/app/types";
import { Box, CardHeader, CardMedia, Grid, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import ProductSaleItem from "./product/ProductSaleItem";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import TimerCountDown from "../TimerCounDown";

type TPropSaleProduct = {
  productSale: ProductType[];
};
const ProductCountDown = ({ productSale }: TPropSaleProduct) => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          🎁 Promotion Products
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid size={{ md: 7 }}>
          <CardMedia
            sx={{ height: 360 }}
            image="/images/salebanner.jpg_.avif"
            title="dealer product"
          />
        </Grid>
        <Grid size={{ md: 5 }}>
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
