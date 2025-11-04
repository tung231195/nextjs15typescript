"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import LikeIcon from "@mui/icons-material/ThumbUpAlt";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Like, PostType } from "@/app/types";
import { useAuthContext } from "@/app/context/AuthContext";
import Link from "next/link";
import { Box } from "@mui/material";
type TPropBlogItem = {
  hanldeLike: (payload: Like) => Promise<void>;
  liked: boolean;
  post: PostType;
};
export default function BlogItem({ post, hanldeLike, liked }: TPropBlogItem) {
  const { user } = useAuthContext();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.title}
        subheader="September 14, 2016"
      />
      <Link href={`blog/${post._id}`}>
        <CardMedia component="img" height="194" image="/images/cms/1.jpg" alt="Paella dish" />
      </Link>
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </Box>
        <IconButton
          aria-label="like"
          onClick={() => hanldeLike({ user: user?._id as string, post: post._id })}
        >
          {liked ? <LikeIcon sx={{ color: "blue" }} /> : <LikeIcon />}
          <Typography>({post.likesCount || 0})</Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
}
