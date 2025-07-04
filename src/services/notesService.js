import axios from "../lib/axios.js";

export const createNote = async (note) => {
  try {
    const response = await axios.post("/notes", note);
    return response.data;
  } catch (err) {
    throw err?.response?.data || { message: "Error creating note" };
  }
};

export const getAllNotes = async () => {
  try {
    const response = await axios.get("/notes");
    return response.data;
  } catch (err) {
    throw err?.response?.data || { message: "Error fetching notes" };
  }
};

export const getSpecificNote = async (noteId) => {
  try {
    const response = await axios.get(`/notes/${noteId}`);
    return response.data;
  } catch (err) {
    throw err?.response?.data || { message: "Error fetching note" };
  }
};

export const updateNote = async (noteId, updatedNote) => {
  try {
    const response = await axios.patch(`/notes/${noteId}`, updatedNote);
    return response.data;
  } catch (err) {
    throw err?.response?.data || { message: "Error updating note" };
  }
};

export const deleteNote = async (noteId) => {
  try {
    const response = await axios.delete(`/notes/${noteId}`);
    return response.data;
  } catch (err) {
    throw err?.response?.data || { message: "Error deleting note" };
  }
};
