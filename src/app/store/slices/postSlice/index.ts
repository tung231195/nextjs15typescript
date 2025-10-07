import { LikeType, PostType } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addPost, deletePost, fetchPosts } from "../../actions/post";

interface PostState {
  posts: PostType[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => {
      state.posts = [];
      state.loading = false;
    },
    updatePostLike: (state, action: PayloadAction<{ post: string; user: string; _id: string }>) => {
      const { post, user, _id } = action.payload;
      const postItem = state.posts.find((p) => p._id === post);

      if (postItem) {
        // Đảm bảo mảng likes tồn tại
        if (!Array.isArray(postItem.likes)) {
          postItem.likes = [];
          postItem.likesCount = 0;
        }
        postItem.likes.push({ _id, user, post });
        postItem.likesCount = postItem.likes.length;
        const findPostIndex = state.posts.findIndex((p) => p._id == post);
        state.posts[findPostIndex] = postItem;
        console.log("post like", postItem, state.posts);
      }
    },
    updatePostUnLike: (
      state,
      action: PayloadAction<{ post: string; user: string; _id: string }>,
    ) => {
      const { post, _id } = action.payload;
      const postItem = state.posts.find((p) => p._id === post);
      if (!Array.isArray((postItem as any).likes)) {
        (postItem as any).likes = [];
      }
      if (postItem) {
        // Đảm bảo mảng likes tồn tại
        if (!Array.isArray(postItem.likes)) {
          postItem.likes = [];
          postItem.likesCount = 0;
        }
        postItem.likes = postItem.likes.filter((like: LikeType) => like._id !== _id);
        postItem.likesCount = postItem.likes.length;
        const findPostIndex = state.posts.findIndex((p) => p._id == post);
        state.posts[findPostIndex] = postItem;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<PostType[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch posts";
      })

      // add post
      .addCase(addPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action: PayloadAction<PostType>) => {
        state.loading = false;
        state.posts = [...state.posts, action.payload];
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch posts";
      })

      // delete post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.posts = state.posts.filter((p) => p._id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch posts";
      });
  },
});

export const { reset, updatePostLike, updatePostUnLike } = postSlice.actions;
export default postSlice.reducer;
