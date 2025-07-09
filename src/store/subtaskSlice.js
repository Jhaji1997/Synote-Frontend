import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createSubtask as createSubtaskAPI,
  getSubtasks as getSubtasksAPI,
  updateSubtask as updateSubtaskAPI,
  deleteSubtask as deleteSubtaskAPI,
} from "../services/subtaskService.js";

export const createSubtask = createAsyncThunk(
  "subtasks/createSubtask",
  async ({ taskId, content }, thunkAPI) => {
    try {
      await createSubtaskAPI(taskId, content);
      const subtasks = await getSubtasksAPI(taskId);
      return subtasks;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.message || "Error creating the subtask"
      );
    }
  }
);

export const getSubtasks = createAsyncThunk(
  "subtasks/getSubtasks",
  async (taskId, thunkAPI) => {
    try {
      const subtasks = await getSubtasksAPI(taskId);
      return subtasks;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.message || "Error fetching the subtasks"
      );
    }
  }
);

export const updateSubtask = createAsyncThunk(
  "subtasks/updateSubtask",
  async ({ taskId, subtaskId, updatedContent }, thunkAPI) => {
    try {
      const subtask = await updateSubtaskAPI(taskId, subtaskId, updatedContent);
      return subtask;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.message || "Error updating the subtask"
      );
    }
  }
);

export const deleteSubtask = createAsyncThunk(
  "subtasks/deleteSubtask",
  async ({ taskId, subtaskId }, thunkAPI) => {
    try {
      await deleteSubtaskAPI(taskId, subtaskId);
      const subtasks = await getSubtasksAPI(taskId);
      return subtasks;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.message || "Error deleting the subtask"
      );
    }
  }
);

const initialState = {
  subtasks: [],
  subtask: null,
  loading: false,
  error: null,
};

const subtaskSlice = createSlice({
  name: "subtasks",
  initialState,
  reducers: {
    clearSubtasksState: (state) => {
      state.subtasks = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSubtask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubtask.fulfilled, (state, action) => {
        state.loading = false;
        state.subtasks = action.payload;
      })
      .addCase(createSubtask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSubtasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubtasks.fulfilled, (state, action) => {
        state.loading = false;
        state.subtasks = action.payload;
      })
      .addCase(getSubtasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSubtask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubtask.fulfilled, (state, action) => {
        state.loading = false;
        state.subtask = action.payload;
      })
      .addCase(updateSubtask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSubtask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubtask.fulfilled, (state, action) => {
        state.loading = false;
        state.subtasks = action.payload;
      })
      .addCase(deleteSubtask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSubtasksState } = subtaskSlice.actions;
export default subtaskSlice.reducer;