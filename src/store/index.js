import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "../states/AuthSlices";
import StudentReducer from "../states/StudentSlice";
import GroupReducer from "../states/GroupSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    students: StudentReducer,
    groups: GroupReducer,
  },

  devTools: process.env.NODE_ENV !== "production",
});
