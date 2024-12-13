import { topUpBalance } from "@/api/query/top-up/top-up-query";
import { createSlice } from "@reduxjs/toolkit";

interface TopUpState {
  balance: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: TopUpState = {
  balance: null,
  loading: false,
  error: null,
};

const topUpSlice = createSlice({
  name: "topUp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(topUpBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(topUpBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload;
      })
      .addCase(topUpBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// export const { logout } = authSlice.actions;
export default topUpSlice.reducer;
