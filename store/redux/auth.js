import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isAuthenticated: false,
    userRole: "User",
  },
  reducers: {
    authenticate: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      const decodedToken = jwtDecode(action.payload.token);
      state.userRole = decodedToken.userRole;
    },

    logout: (state, action) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { authenticate, logout } = authSlice.actions;
export default authSlice.reducer;
