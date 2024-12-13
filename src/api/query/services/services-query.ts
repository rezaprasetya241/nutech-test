import apiClient from "@/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface ResServicesDTO {
  status: number;
  messsage: string;
  data: servicesData[];
}

export interface servicesData {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

export const Services = createAsyncThunk(
  "services/list",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/services");
      const { data } = response.data;
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "Fecthing Failed");
    }
  }
);
