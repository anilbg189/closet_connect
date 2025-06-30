// src/features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initial: [],
  filtered: [],
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setFilteredContent: (state, action) => {
      state.filtered = [...action.payload];
    },
    setInitialContent: (state, action) => {
      state.initial = [...action.payload];
    },
  },
});

export const { setFilteredContent, setInitialContent } = contentSlice.actions;
export default contentSlice.reducer;
