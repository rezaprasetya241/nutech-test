import apiClient from "@/api/axios";
import { RootState } from "@/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface TransactionHistory {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: string;
}

export const getTransactionsHistory = createAsyncThunk(
  "transactions/fetchTransactions",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const limit = 5;
      const offset = state.history.data.offset;

      const response = await apiClient.get(`/transaction/history`, {
        params: { limit, offset },
      });
      return response.data.data.records; // Assuming the API response has a transactions key

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "Fecthing Failed");
    }
  }
);
