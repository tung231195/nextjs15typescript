"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CommentType, PostType } from "@/app/types";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import { useAuthContext } from "@/app/context/AuthContext";
import toast from "react-hot-toast";
import { getCommentsByPostService, hanldeCommentService } from "@/app/services/commentService";
import { useSocket } from "@/app/hooks/useSocket";
import ShareButtons from "@/app/components/ShareButtons";
type TPropPostDetail = {
  blog: PostType;
};
const PostDetail = (props: TPropPostDetail) => {
  const { blog: post } = props;
  const [comment, setComment] = useState<string>("");
  const [listComments, setListComments] = useState<CommentType[]>([]);
  // const [post, setPost] = useState<PostType>();
  const params = useParams();
  const { id } = params;
  const { user } = useAuthContext();
  const { onEvent, emitEvent } = useSocket();
  // useEffect(() => {
  //   const fetchPost = async () => {
  //     const fetchPost = await getPostService(id as string);
  //     setPost(fetchPost);
  //   };
  //   fetchPost();
  // }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await getCommentsByPostService(id as string);
      if (res) {
        console.log("list comments", res);
        setListComments(res);
      }
    };
    fetchComments();
  }, [id]);

  // Nhận tin nhắn mới
  useEffect(() => {
    if (!onEvent) return;

    const offAdded = onEvent("comment.added", (msg: CommentType) => {
      setListComments((prev) => [...prev, msg]);
    });
    emitEvent("join", user?._id);
    // const offNotify = onEvent("comment.notify", (msg: CommentType) => {
    //   console.log("notify message", msg);
    //   setNotify((prev) => [...prev, msg.user.email]);
    // });

    return () => {
      offAdded();
      //offNotify();
    };
  }, [onEvent]);
  const handleComment = async () => {
    console.log("user comment", user);
    if (!comment || !user) {
      toast.error("the comment is empty");
      return;
    }
    await hanldeCommentService({ user: user._id, content: comment, post: id as string });
    setComment("");
  };
  console.log("post", post);
  return (
    <Box sx={{ margin: "20px auto", width: "100%" }}>
      <Card>
        <CardMedia
          sx={{ maxWidth: "300px", margin: "0 auto" }}
          component="img"
          height="auto"
          image="/images/cms/product1.jpg"
          alt="Paella dish"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {post?.title}
          </Typography>
          <Typography gutterBottom variant="caption" component="div">
            {post?.user}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {post?.content}
          </Typography>
        </CardContent>
        <CardActions>
          <ShareButtons slug={post?._id as string} title={post?.title as string} />
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      <Box>
        {listComments &&
          listComments.map((c) => {
            return (
              <Box
                key={c._id}
                sx={{
                  mb: 2,
                  p: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  backgroundColor: "#fafafa",
                }}
              >
                <Typography variant={"h6"}>{c.user?.email}</Typography>
                <Typography variant="caption">{c.content}</Typography>
              </Box>
            );
          })}
      </Box>
      <Box>
        <TextField value={comment} name="comment" onChange={(e) => setComment(e.target.value)} />
        <Button onClick={handleComment} type="button">
          send
        </Button>
      </Box>
    </Box>
  );
};

export default PostDetail;
