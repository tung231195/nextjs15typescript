import customAxios from "../utils/customAxious";
import { Like } from "../types";
export const hanldeLikeService = async (payload: Like) => {
  try {
    const res = await customAxios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/likes`, payload);
    return res.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};
