import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stats: [],
  group: null,
  subjects: null,
  loading: true,
  errors: null,
};

export const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    groupStart: (state, action) => {
      state.loading = true;
      state.errors = null;
      state.stats = null;
    },

    groupSuccess: (state, action) => {
      state.loading = false;
      state.stats = action.payload;
      state.errors = null;
    },

    groupFail: (state, action) => {
      state.stats = null;
      state.errors = action.payload;
      state.loading = false;
    },

    setSubjects: (state, action) => {
      state.subjects = action.payload;
    },

    checkGroup: (state, action) => {
      state.group = action.payload;
      state.loading = false;
      state.errors = null;
    },

    checkGroupFail: (state, action) => {
      state.group = null;
      state.errors = action.payload;
    },
  },
});

export const {
  groupStart,
  groupSuccess,
  groupFail,
  setSubjects,
  checkGroup,
  checkGroupFail,
} = groupSlice.actions;
export default groupSlice.reducer;
