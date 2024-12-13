import apiClient from "@/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface bannerData {
  banner_name: string;
  banner_image: string;
  description: string;
}

export const getBanner = createAsyncThunk(
  "banner/list",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/banner");
      const { data } = response.data;
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "Fecthing Failed");
    }
  }
);
