import apiClient from "@/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface ReqTopUpDTO {
  top_up_amount: number;
}
export const topUpBalance = createAsyncThunk(
  "topUp/balance",
  async (credentials: ReqTopUpDTO, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/topup", credentials);
      const { balance } = response.data.data;
      return balance;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "Top Up failed");
    }
  }
);
