import {
  getProfile,
  profileData,
  updateProfilePicture,
} from "@/api/query/profile/profile-query";
import { createSlice } from "@reduxjs/toolkit";

interface ProfileState {
  loading: boolean;
  error: string | null;
  data: profileData;
}

const initialState: ProfileState = {
  loading: false,
  error: null,
  data: {} as profileData,
};

const profileSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    updateProfile(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProfilePicture.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
