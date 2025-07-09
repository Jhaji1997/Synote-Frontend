import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createTask as createTaskAPI,
  getAllTasks,
  getSpecificTask,
  updateTask as updateTaskAPI,
  deleteTask as deleteTaskAPI,
  getTaskWithSubtasks as getTaskWithSubtasksAPI,
} from "../services/tasksService.js";

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ title, dueDate }, thunkAPI) => {
    try {
      await createTaskAPI(title, dueDate);
      const tasks = await getAllTasks();
      return tasks;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.message || "Error creating the task"
      );
    }
  }
);

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, thunkAPI) => {
    try {
      const tasks = await getAllTasks();
      return tasks;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.message || "Error fetching the tasks"
      );
    }
  }
);

export const getTask = createAsyncThunk(
  "tasks/getTask",
  async (taskId, thunkAPI) => {
    try {
      const task = await getSpecificTask(taskId);
      return task;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.message || "Error fetching the task"
      );
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, updatedTitle, newDueDate }, thunkAPI) => {
    try {
      await updateTaskAPI(taskId, updatedTitle, newDueDate);
      const tasks = await getAllTasks();
      return tasks;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.message || "Error updating the task"
      );
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, thunkAPI) => {
    try {
      await deleteTaskAPI(taskId);
      const tasks = await getAllTasks();
      return tasks;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.message || "Error deleting the task"
      );
    }
  }
);

export const getTaskWithSubtasks = createAsyncThunk(
  "tasks/getTaskWithSubtasks",
  async (_, thunkAPI) => {
    try {
      const tasks = await getTaskWithSubtasksAPI();
      return tasks;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.message || "Error fetching tasks with subtasks"
      );
    }
  }
);

const initialState = {
  tasks: [],
  task: null,
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearTasksState: (state) => {
      state.tasks = [];
      state.task = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTaskWithSubtasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTaskWithSubtasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTaskWithSubtasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTasksState } = tasksSlice.actions;
export default tasksSlice.reducer;
