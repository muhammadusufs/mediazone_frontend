import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  student: null,
  loading: true,
  errors: null,
  history: null,
};

export const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    studentStart: (state, action) => {
      state.loading = true;
      state.errors = null;
      state.student = null;
    },

    studentSuccess: (state, action) => {
      state.loading = false;
      state.students = action.payload;
      state.errors = null;
    },

    studentFail: (state, action) => {
      state.students = null;
      state.errors = action.payload;
      state.loading = false;
    },

    checkStudent: (state, action) => {
      state.student = action.payload;
      state.loading = false;
      state.errors = null;
    },

    checkStudentFail: (state, action) => {
      state.student = null;
      state.errors = action.payload;
    },

    historyStudent: (state, action) => {
      state.history = action.payload;
    },
  },
});

export const {
  studentStart,
  studentSuccess,
  studentFail,
  checkStudent,
  checkStudentFail,
  historyStudent,
} = studentSlice.actions;
export default studentSlice.reducer;
