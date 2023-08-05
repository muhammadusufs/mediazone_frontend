import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: [],
  group: null,
  loading: true,
  errors: null,
};

export const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    groupStart: (state, action) => {
      state.loading = true;
    },

    groupSuccess: (state, action) => {
      state.loading = false;
      state.groups = action.payload;
      state.errors = null;
    },

    groupFail: (state, action) => {
      state.groups = null;
      state.errors = action.payload;
      state.loading = false;
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
  checkGroup,
  checkGroupFail,
} = groupSlice.actions;
export default groupSlice.reducer;
