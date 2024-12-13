import apiClient from "@/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface ResProfileDTO {
  status: number;
  messsage: string;
  data: profileData[];
}
export interface profileData {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

export interface updateProfile {
  first_name: string;
  last_name: string;
}

export const updateProfile = createAsyncThunk(
  "profile/update",
  async (val: updateProfile, { rejectWithValue }) => {
    try {
      const response = await apiClient.put("/profile/update", val);
      const { data } = response.data;
      return data;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "Fecthing Failed");
    }
  }
);

export const updateProfilePicture = createAsyncThunk(
  "profile/updateProfilePicture",
  async (file: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await apiClient.put("/profile/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile picture"
      );
    }
  }
);

export const getProfile = createAsyncThunk(
  "profile/details",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/profile");
      const { data } = response.data;
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "Fecthing Failed");
    }
  }
);
