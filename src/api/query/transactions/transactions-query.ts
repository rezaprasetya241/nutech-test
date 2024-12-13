import apiClient from "@/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface ReqPaymentDTO {
  service_code: string;
}
export const transactions = createAsyncThunk(
  "payment/transactions",
  async (credentials: ReqPaymentDTO, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/transaction", credentials);
      return response.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "Payment failed");
    }
  }
);
