"use client";
import { useEffect, useState } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { Box, Button, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { SlideshowType } from "@/app/types";
import { useTranslations } from "next-intl";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { htmlToText } from "@/app/utils";

type TPropSlideshow = {
  slideshows: SlideshowType[];
};

const textVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const Slideshows = ({ slideshows }: TPropSlideshow) => {
  const controls = useAnimation();
  const [activeIndex, setActiveIndex] = useState(0);
  const t = useTranslations("Slideshow");

  useEffect(() => {
    controls.start("hidden").then(() => controls.start("visible"));
  }, [activeIndex]);

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5500, disableOnInteraction: false }}
      loop
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      className="rounded-3xl overflow-hidden shadow-xl"
    >
      {slideshows?.map((s) => (
        <SwiperSlide key={s._id}>
          {/* Background Image */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: { xs: "1/1.2", sm: "16/9", md: "2046/768" },
              background: `url(${s.image[0]}) center/cover no-repeat`,
              display: "flex",
              alignItems: "center",
              px: { xs: 3, sm: 6, md: 12 },
              py: { xs: 4, md: 0 },
              overflow: "hidden",
            }}
          >
            {/* Dark Overlay */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to right, rgba(0,0,0,0.65), rgba(0,0,0,0.2))",
                backdropFilter: "blur(1.5px)",
                zIndex: 1,
              }}
            />

            {/* Content */}
            <motion.div
              variants={textVariant}
              initial="hidden"
              animate={controls}
              style={{
                position: "relative",
                zIndex: 2,
                maxWidth: "55%",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.2,
                  mb: 2,
                  textShadow: "0 4px 14px rgba(0,0,0,0.5)",
                  fontSize: { xs: "1.9rem", sm: "2.6rem", md: "3.2rem" },
                  color: "#fff",
                }}
              >
                {s.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  opacity: 0.9,
                  mb: 4,
                  fontSize: { xs: "1rem", sm: "1.15rem" },
                  color: "#f2f2f2",
                  maxWidth: "90%",
                  lineHeight: 1.6,
                }}
              >
                {htmlToText(s.description)}
              </Typography>

              <motion.div variants={textVariant} animate={controls}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "50px",
                    px: 5,
                    py: 1.5,
                    fontWeight: 700,
                    textTransform: "none",
                    letterSpacing: 0.5,
                    fontSize: "1rem",
                    background: "linear-gradient(135deg, #ff6b6b, #ff4757, #ff7f50)",
                    boxShadow: "0 8px 20px rgba(255, 90, 90, 0.4)",
                    "&:hover": {
                      boxShadow: "0 10px 26px rgba(255, 90, 90, 0.55)",
                      transform: "translateY(-2px)",
                    },
                    transition: "0.25s ease",
                  }}
                >
                  {t("shopNow")}
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
