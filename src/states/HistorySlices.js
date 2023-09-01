import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  histories: [],
  loading: true,
  errors: null,
};

export const historySlice = createSlice({
  name: "histories",
  initialState,
  reducers: {
    historyStart: (state, action) => {
      state.loading = true;
      state.errors = null;
      state.teachers = null;
    },

    historySuccess: (state, action) => {
      state.loading = false;
      state.histories = action.payload;
      state.errors = null;
    },

    historyFail: (state, action) => {
      state.expenses = null;
      state.errors = action.payload;
      state.loading = false;
    },
  },
});

export const { historyStart, historySuccess, historyFail } =
  historySlice.actions;
export default historySlice.reducer;
