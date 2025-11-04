import {
  addSlideshowsService,
  deleteSlideshowService,
  getSlideshowsService,
  updateSlideshowService,
} from "@/app/services/slideshowService";
import { SlideshowCreate, SlideshowType } from "@/app/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk Actions

/** fetch slideshows */
export const fetchSlideshows = createAsyncThunk("slideshows/fetchSlideshows", async () => {
  return await getSlideshowsService();
});

/** add slideshow */
export const addSlideshow = createAsyncThunk(
  "slideshows/addSlideshow",
  async (slideshow: Omit<SlideshowCreate, "_id">) => {
    const res = await addSlideshowsService(slideshow);
    return res;
  },
);

/** update slideshow */
export const updateSlideshow = createAsyncThunk(
  "slideshows/updateSlideshow",
  async (slideshow: SlideshowType) => {
    return await updateSlideshowService(slideshow);
  },
);

/** delete slideshow */
export const deleteSlideshow = createAsyncThunk(
  "slideshows/deleteSlideshow",
  async (_id: string) => {
    return await deleteSlideshowService(_id);
  },
);
