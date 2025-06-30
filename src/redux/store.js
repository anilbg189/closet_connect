import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./contentSlice"; // Example reducer

export const store = configureStore({
  reducer: {
    content: contentReducer, // Add your reducers here
  },
});
