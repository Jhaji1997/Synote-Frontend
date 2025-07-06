// src/services/notesService.js
import axios from "../lib/axios.js";

/**
 * Helper to unwrap the standard API response envelope
 */
const unwrap = (response) => {
  const { data: envelope } = response;
  if (!envelope.success) {
    throw new Error(envelope.message || "API Error");
  }
  return envelope.data;
};

export const createNote = async (note) => {
  try {
    const response = await axios.post("/notes", note);
    return unwrap(response);    // returns the created note object
  } catch (err) {
    const msg = err.response?.data?.message || "Error creating note";
    throw new Error(msg);
  }
};

export const getAllNotes = async () => {
  try {
    const response = await axios.get("/notes");
    return unwrap(response);    // returns the array of notes
  } catch (err) {
    const msg = err.response?.data?.message || "Error fetching notes";
    throw new Error(msg);
  }
};

export const getSpecificNote = async (noteId) => {
  try {
    const response = await axios.get(`/notes/${noteId}`);
    return unwrap(response);    // returns a single note object
  } catch (err) {
    const msg = err.response?.data?.message || "Error fetching note";
    throw new Error(msg);
  }
};

export const updateNote = async (noteId, updatedNote) => {
  try {
    const response = await axios.patch(`/notes/${noteId}`, updatedNote);
    return unwrap(response);    // returns the updated note object
  } catch (err) {
    const msg = err.response?.data?.message || "Error updating note";
    throw new Error(msg);
  }
};

export const deleteNote = async (noteId) => {
  try {
    const response = await axios.delete(`/notes/${noteId}`);
    return unwrap(response);    // returns an empty object or deletion result
  } catch (err) {
    const msg = err.response?.data?.message || "Error deleting note";
    throw new Error(msg);
  }
};
