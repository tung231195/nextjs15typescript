import { AxiosError } from "axios";
import { PostType, PostCreate } from "../types";
import customAxios from "../utils/customAxious";

/** get posts */
const getPostsService = async () => {
  try {
    const posts = await customAxios.get(`posts`);
    return posts.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }

  //return login;
};

/** get post */
const getPostService = async (id: string) => {
  try {
    const posts = await customAxios.get(`posts/${id}`);
    return posts.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }

  //return login;
};

/** add post */
const addPostsService = async (data: PostCreate) => {
  try {
    const posts = await customAxios.post(`posts`, data);
    return posts.data;
  } catch (e: unknown) {
    const error = e as AxiosError<{ message: string }>;
    if (error.response) {
      console.error("API error:", error.response.data?.message, "status:", error.response.status);
    } else {
      console.error("Unexpected error:", error.message);
    }
    throw error;
  }
};

/** update post */
const updatePostService = async (data: PostType) => {
  try {
    const posts = await customAxios.put(`posts/${data._id}`, data);
    return posts.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};
/** delete post */
const deletePostService = async (_id: string) => {
  try {
    const posts = await customAxios.delete(`posts/${_id}`);
    return posts.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};
export { getPostsService, addPostsService, updatePostService, deletePostService, getPostService };
