import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toastInfo: null,
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setToastInfo: (state, action) => {
      state.toastInfo = action.payload;
    },
  },
});

export const { setToastInfo } = configSlice.actions;
export default configSlice.reducer;
