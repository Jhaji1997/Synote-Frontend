import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  createNote as createNoteAPI,
  getAllNotes,
  getSpecificNote,
  updateNote as updateNoteAPI,
  deleteNote as deleteNoteAPI,
} from "../services/notesService.js";

// Create a note
export const createNote = createAsyncThunk(
  "notes/createNote",
  async (note, thunkAPI) => {
    try {
      await createNoteAPI(note);
      const notes = await getAllNotes();
      return notes;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.message || "Error creating the note"
      );
    }
  }
);

// Get all notes of the user
export const getNotes = createAsyncThunk(
  "notes/getNotes",
  async (_, thunkAPI) => {
    try {
      const notes = await getAllNotes();
      return notes;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.message || "Error fetching the notes"
      );
    }
  }
);

// Get a specific note of the user
export const getNote = createAsyncThunk(
  "notes/getNote",
  async (noteId, thunkAPI) => {
    try {
      const note = await getSpecificNote(noteId);
      return note;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.message || "Error fetching the note"
      );
    }
  }
);

// Update a note
export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ noteId, updatedNote }, thunkAPI) => {
    try {
      const note = await updateNoteAPI(noteId, updatedNote);
      return note;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.message || "Error updating the note"
      );
    }
  }
);

// Delete a note
export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (noteId, thunkAPI) => {
    try {
      await deleteNoteAPI(noteId);
      const notes = await getAllNotes();
      return notes;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.message || "Error deleting the note"
      );
    }
  }
);

const initialState = {
  notes: [],
  currentNote: null,
  error: null,
  loading: false,
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    clearNotesState: (state) => {
      state.notes = [];
      state.currentNote = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Note
      .addCase(createNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Notes
      .addCase(getNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Specific Note
      .addCase(getNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNote.fulfilled, (state, action) => {
        state.loading = false;
        state.currentNote = action.payload;
      })
      .addCase(getNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update a note
      .addCase(updateNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.loading = false;
        state.currentNote = action.payload;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete a note
      .addCase(deleteNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
        state.currentNote = null;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearNotesState } = noteSlice.actions;
export default noteSlice.reducer;
