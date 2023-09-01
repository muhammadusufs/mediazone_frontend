import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "../states/AuthSlices";
import StudentReducer from "../states/StudentSlice";
import GroupReducer from "../states/GroupSlice";
import TeacherReducer from "../states/TeacherSlice";
import ExpenseReducer from "../states/ExpenseSlice";
import HistoryReducer from "../states/HistorySlices";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    students: StudentReducer,
    groups: GroupReducer,
    teachers: TeacherReducer,
    expenses: ExpenseReducer,
    histories: HistoryReducer,
  },

  devTools: process.env.NODE_ENV !== "production",
});
