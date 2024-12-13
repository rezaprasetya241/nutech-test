import apiClient from "@/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface ResBalancesDTO {
  status: number;
  messsage: string;
  data: balance;
}

export interface balance {
  balance: number;
}

export const getBalances = createAsyncThunk(
  "balance/updated",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/balance");
      const { data } = response.data;
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "Fecthing Failed");
    }
  }
);
