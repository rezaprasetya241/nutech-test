import { bannerData, getBanner } from "@/api/query/banner/banner-query";
import { createSlice } from "@reduxjs/toolkit";

interface ServicesState {
  loading: boolean;
  error: string | null;
  data: bannerData[];
}

const initialState: ServicesState = {
  loading: false,
  error: null,
  data: [],
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bannerSlice.reducer;
