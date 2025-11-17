import { SlideshowType } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addSlideshow, deleteSlideshow, fetchSlideshows } from "../../actions/slideshow";

interface SlideshowState {
  slideshows: SlideshowType[];
  loading: boolean;
  error: string | null;
}

const initialState: SlideshowState = {
  slideshows: [],
  loading: false,
  error: null,
};

const slideshowSlice = createSlice({
  name: "slideshow",
  initialState,
  reducers: {
    reset: (state) => {
      state.slideshows = [];
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchSlideshows
      .addCase(fetchSlideshows.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSlideshows.fulfilled, (state, action: PayloadAction<SlideshowType[]>) => {
        state.loading = false;
        state.slideshows = action.payload;
      })
      .addCase(fetchSlideshows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch slideshows";
      })

      // add slideshow
      .addCase(addSlideshow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSlideshow.fulfilled, (state, action: PayloadAction<SlideshowType>) => {
        state.loading = false;
        state.slideshows = [...state.slideshows, action.payload];
      })
      .addCase(addSlideshow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch slideshows";
      })

      // delete slideshow
      .addCase(deleteSlideshow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSlideshow.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.slideshows = state.slideshows.filter((p) => p._id !== action.payload);
      })
      .addCase(deleteSlideshow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch slideshows";
      });
  },
});

export const { reset } = slideshowSlice.actions;
export default slideshowSlice.reducer;
