import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import notesReducer from "./notesSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
