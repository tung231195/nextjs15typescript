"use client";
import { useEffect, useState } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { Box, Button, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { SlideshowType } from "@/app/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type TPropSlideshow = {
  slideshows: SlideshowType[];
};

const textVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const Slideshows = ({ slideshows }: TPropSlideshow) => {
  const controls = useAnimation();
  const [activeIndex, setActiveIndex] = useState(0);

  // 🧩 Trigger animation safely after slide change
  useEffect(() => {
    controls.start("hidden").then(() => controls.start("visible"));
  }, [activeIndex, controls]);

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // ✅ just update state here
      className="rounded-2xl overflow-hidden shadow-lg"
    >
      {slideshows?.map((s) => (
        <SwiperSlide key={s._id}>
          <Box
            sx={{
              position: "relative",
              background: `linear-gradient(to right, rgba(0,0,0,0.65), rgba(0,0,0,0.2)), url(${s.image[0]}) center/cover no-repeat`,
              width: "100%",
              aspectRatio: { xs: "1/1", sm: "16/9", md: "2046/768" },
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              px: { xs: 3, sm: 6, md: 12 },
              color: "#fff",
            }}
          >
            <motion.div
              variants={textVariant}
              initial="hidden"
              animate={controls}
              style={{ maxWidth: "60%" }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
                }}
              >
                {s.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  opacity: 0.85,
                  fontSize: { xs: "0.95rem", sm: "1.1rem" },
                }}
              >
                {s.description}
              </Typography>

              <motion.div variants={textVariant} animate={controls} transition={{ delay: 0.3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "50px",
                    px: 4,
                    py: 1.2,
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                    "&:hover": { boxShadow: "0 6px 20px rgba(0,0,0,0.3)" },
                  }}
                >
                  Shop Now
                </Button>
              </motion.div>
            </motion.div>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slideshows;
