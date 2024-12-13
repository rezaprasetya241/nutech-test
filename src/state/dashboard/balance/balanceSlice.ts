import { balance, getBalances } from "@/api/query/balance/balance-query";
import { createSlice } from "@reduxjs/toolkit";

interface BalancesState {
  loading: boolean;
  error: string | null;
  data: balance;
}

const initialState: BalancesState = {
  loading: false,
  error: null,
  data: {
    balance: 0,
  },
};
const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    updateBalance(state, action) {
      state.data.balance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBalances.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBalances.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getBalances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
