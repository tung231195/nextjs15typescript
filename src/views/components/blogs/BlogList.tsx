"use client";
import * as React from "react";
import BlogItem from "./BlogItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { fetchPosts } from "@/app/store/actions/post";
import { Like, PostType } from "@/app/types";
import { Box, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import io from "socket.io-client";
import { hanldeLikeService } from "@/app/services/likeService";
import { useAuthContext } from "@/app/context/AuthContext";
import toast from "react-hot-toast";
import { updatePostLike, updatePostUnLike } from "@/app/store/slices/postSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useTranslations } from "next-intl";

//const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const NOTIF = process.env.NEXT_PUBLIC_BACKEND_URL || "https://nodejs2015typescript.onrender.com";

export default function BlogList() {
  const t = useTranslations("IndexPage");
  const { user } = useAuthContext();
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.post.posts);
  React.useEffect(() => {
    const s = io(NOTIF);
    dispatch(fetchPosts());
    s.on("connect", () => console.log("socket connected"));
    s.on("post.liked", (data) => {
      dispatch(updatePostLike(data));
    });
    s.on("post.unliked", (data) => {
      dispatch(updatePostUnLike(data));
    });

    return () => {
      s.disconnect();
    };
  }, [dispatch]);

  const hanldeLike = async (payload: Like) => {
    if (!user) toast.error("You need to login to like");
    await hanldeLikeService(payload);
  };
  return (
    <Box mt={3}>
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{
          background: "linear-gradient(90deg, #000, #000)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {t("BlogList")}
      </Typography>

      <Grid container spacing={1} mt={0}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={false}
          autoplay={{ delay: 300000, disableOnInteraction: false }}
          loop
          breakpoints={{
            320: { slidesPerView: 1 }, // mobile
            640: { slidesPerView: 2 }, // tablet nhỏ
            1024: { slidesPerView: 3 }, // laptop
            1280: { slidesPerView: 4 }, // desktop lớn
          }}
          className="rounded-2xl overflow-hidden shadow-lg"
        >
          {posts &&
            posts.length > 0 &&
            posts.map((post: PostType) => {
              //const liked = post.likes.find((l: any) => l.user._id == user?._id);
              const liked = post.likes.find((l: Like) => l.user == user?._id);
              return (
                <SwiperSlide key={post._id}>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
                    <BlogItem post={post} hanldeLike={hanldeLike} liked={liked ? true : false} />
                  </motion.div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </Grid>
    </Box>
  );
}
