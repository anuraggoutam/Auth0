import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, accessToken: null, roles: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, roles } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.roles = roles;
    },
    logOut: (state, action) => {
      state.user = null;
      state.accessToken = null;
      state.roles = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
export const selectAuthState = (state) => state.auth;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.accessToken;
export const selectCurrentRoles = (state) => state.auth.roles;
