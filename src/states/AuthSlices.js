import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../utils/storage";

const initialState = {
  loading: true,
  authenticated: false,
  access: null,
  user: null,
  company: null,
  errors: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state, action) => {
      state.loading = true;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.authenticated = true;
      state.access = action.payload;
      state.errors = null;
      setItem("token", action.payload);
    },

    loginFail: (state, action) => {
      state.loading = false;
      state.authenticated = false;
      state.user = null;
      state.errors = action.payload;
    },

    getUser: (state, action) => {
      state.user = action.payload;
    },

    setCompany: (state, action) => {
      state.company = action.payload;
    },

    logOut: (state, action) => {
      state.loading = false;
      state.authenticated = false;
      state.access = null;
      state.user = null;
      state.errors = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  getUser,
  logOut,
  setCompany,
} = authSlice.actions;
export default authSlice.reducer;
