import customAxios from "../utils/customAxious";
import { Comment } from "../types";
export const hanldeCommentService = async (payload: Comment) => {
  try {
    const res = await customAxios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments`, payload);
    return res.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};

export const getCommentsByPostService = async (post: string) => {
  try {
    const res = await customAxios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${post}`);
    return res.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};
