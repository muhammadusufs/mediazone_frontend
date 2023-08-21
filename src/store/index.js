import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "../states/AuthSlices";
import StudentReducer from "../states/StudentSlice";
import GroupReducer from "../states/GroupSlice";
import TeacherReducer from "../states/TeacherSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    students: StudentReducer,
    groups: GroupReducer,
    teachers: TeacherReducer,
  },

  devTools: process.env.NODE_ENV !== "production",
});
