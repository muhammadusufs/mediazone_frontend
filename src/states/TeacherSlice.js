import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teachers: [],
  teacher: null,
  stats: null,
  loading: true,
  errors: null,
};

export const teacherSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    teacherStart: (state, action) => {
      state.loading = true;
      state.errors = null;
      state.teachers = null;
    },

    teacherSuccess: (state, action) => {
      state.loading = false;
      state.teachers = action.payload;
      state.errors = null;
    },

    teacherFail: (state, action) => {
      state.teachers = null;
      state.errors = action.payload;
      state.loading = false;
    },

    checkTeacher: (state, action) => {
      state.teacher = action.payload;
      state.loading = false;
      state.errors = null;
    },

    checkTeacherFail: (state, action) => {
      state.teacher = null;
      state.errors = action.payload;
    },

    setTeacherStats: (state, action) => {
      state.loading = false;
      state.stats = action.payload;
      state.errors = null;
    },
  },
});

export const {
  teacherStart,
  teacherSuccess,
  teacherFail,
  checkTeacher,
  checkTeacherFail,
  setTeacherStats,
} = teacherSlice.actions;
export default teacherSlice.reducer;
