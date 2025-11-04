import { AxiosError } from "axios";
import { SlideshowType, SlideshowCreate } from "../types";
import customAxios from "../utils/customAxious";

/** get slideshows */
const getSlideshowsService = async () => {
  try {
    const slideshows = await customAxios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/slideshow`);
    return slideshows.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }

  //return login;
};

/** get slideshow */
const getSlideshowService = async (id: string) => {
  try {
    const slideshows = await customAxios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/slideshow/${id}`,
    );
    return slideshows.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }

  //return login;
};

/** add slideshow */
const addSlideshowsService = async (data: SlideshowCreate) => {
  try {
    const slideshows = await customAxios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/slideshow`,
      data,
    );
    return slideshows.data;
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

/** update slideshow */
const updateSlideshowService = async (data: SlideshowType) => {
  try {
    const slideshows = await customAxios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/slideshow/${data._id}`,
      data,
    );
    return slideshows.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};
/** delete slideshow */
const deleteSlideshowService = async (_id: string) => {
  try {
    const slideshows = await customAxios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/slideshow/${_id}`,
    );
    return slideshows.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};
export {
  getSlideshowsService,
  addSlideshowsService,
  updateSlideshowService,
  deleteSlideshowService,
  getSlideshowService,
};
