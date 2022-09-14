import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isLoading: false,
};
export const loading = createSlice({
  name: "loading",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { showLoading, hideLoading } = loading.actions;

export default loading.reducer;
