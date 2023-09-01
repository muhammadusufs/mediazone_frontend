import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  loading: true,
  errors: null,
};

export const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    expenseStart: (state, action) => {
      state.loading = true;
      state.errors = null;
      state.teachers = null;
    },

    expenseSuccess: (state, action) => {
      state.loading = false;
      state.expenses = action.payload;
      state.errors = null;
    },

    expenseFail: (state, action) => {
      state.expenses = null;
      state.errors = action.payload;
      state.loading = false;
    },
  },
});

export const { expenseStart, expenseSuccess, expenseFail } =
  expenseSlice.actions;
export default expenseSlice.reducer;
