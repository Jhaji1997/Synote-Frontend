import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import notesReducer from "./notesSlice.js";
import tasksReducer from "./tasksSlice.js";
import subtaskReducer from "./subtaskSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
    tasks: tasksReducer,
    subtasks: subtaskReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
