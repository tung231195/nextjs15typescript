import {
  addPostsService,
  deletePostService,
  getPostsService,
  updatePostService,
} from "@/app/services/postService";
import { PostCreate, PostType } from "@/app/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk Actions

/** fetch posts */
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return await getPostsService();
});

/** add post */
export const addPost = createAsyncThunk("posts/addPost", async (post: Omit<PostCreate, "_id">) => {
  const res = await addPostsService(post);
  return res;
});

/** update post */
export const updatePost = createAsyncThunk("posts/updatePost", async (post: PostType) => {
  return await updatePostService(post);
});

/** delete post */
export const deletePost = createAsyncThunk("posts/deletePost", async (_id: string) => {
  return await deletePostService(_id);
});
