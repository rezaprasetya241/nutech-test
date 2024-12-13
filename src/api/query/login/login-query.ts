import apiClient from "@/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface LoginCredentials {
  email: string;
  password: string;
}
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/login", credentials);
      const { token } = response.data.data;
      sessionStorage.setItem("token", token);
      return token;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "Login failed");
    }
  }
);
