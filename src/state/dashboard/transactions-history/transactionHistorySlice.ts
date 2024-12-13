import {
  getTransactionsHistory,
  TransactionHistory,
} from "@/api/query/history-transactions/history-transactions-query";
import { createSlice } from "@reduxjs/toolkit";

export interface TransactionState {
  data: {
    offset: number;
    limit: number;
    records: TransactionHistory[];
  };
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  data: {
    offset: 0,
    limit: 5,
    records: [],
  },
  loading: false,
  error: null,
};

const transactionHistorySlice = createSlice({
  name: "transactionHistory",
  initialState,
  reducers: {
    resetTransactions(state) {
      state.data = {
        offset: 0,
        limit: 5,
        records: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionsHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactionsHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.data.records = [...state.data.records, ...action.payload];
        state.data.offset += 5; // Increment the offset for the next set of data
      })
      .addCase(getTransactionsHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch transactions";
      });
  },
});

export const { resetTransactions } = transactionHistorySlice.actions;
export default transactionHistorySlice.reducer;
