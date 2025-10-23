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

//const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const NOTIF = process.env.NEXT_PUBLIC_NOTIFICATION_URL || "http://localhost:5000";

export default function BlogList() {
  const { user } = useAuthContext();
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.post.posts);
  React.useEffect(() => {
    const s = io(NOTIF);
    dispatch(fetchPosts());
    s.on("connect", () => console.log("socket connected"));
    s.on("post.liked", (data) => {
      console.log("pos like event", data);
      dispatch(updatePostLike(data));
    });
    s.on("post.unliked", (data) => {
      console.log("un like event", data);
      dispatch(updatePostUnLike(data));
    });
  }, [dispatch]);

  console.log("post list", posts);
  const hanldeLike = async (payload: Like) => {
    if (!user) toast.error("You need to login to like");
    await hanldeLikeService(payload);
  };
  return (
    <Box mt={2}>
      <Typography variant="h4">Blog List</Typography>
      <Grid container spacing={1} mt={0}>
        {posts &&
          posts.length > 0 &&
          posts.map((post: PostType) => {
            console.log("user ", user, post);
            //const liked = post.likes.find((l: any) => l.user._id == user?._id);
            const liked = post.likes.find((l: Like) => l.user == user?._id);
            return (
              <React.Fragment key={post._id}>
                <Grid size={{ md: 3, sm: 1, xs: 12, xl: 3 }} mt={2}>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
                    <BlogItem post={post} hanldeLike={hanldeLike} liked={liked ? true : false} />
                  </motion.div>
                </Grid>
              </React.Fragment>
            );
          })}
      </Grid>
    </Box>
  );
}
