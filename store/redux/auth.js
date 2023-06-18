import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    authenticate: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    logout: (state, action) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { authenticate, logout } = authSlice.actions;
export default authSlice.reducer;
