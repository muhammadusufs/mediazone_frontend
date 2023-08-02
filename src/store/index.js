import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "../states/AuthSlices";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },

  devTools: process.env.NODE_ENV !== "production",
});
