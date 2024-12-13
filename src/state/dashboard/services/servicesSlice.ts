import { Services, servicesData } from "@/api/query/services/services-query";
import { createSlice } from "@reduxjs/toolkit";

interface ServicesState {
  loading: boolean;
  error: string | null;
  data: servicesData[];
}

const initialState: ServicesState = {
  loading: false,
  error: null,
  data: [],
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Services.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Services.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(Services.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default servicesSlice.reducer;
