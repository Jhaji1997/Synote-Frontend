import axios from "../lib/axios.js";

const unwrap = (response) => {
  const { data: envelope } = response;
  if (!envelope.success) {
    throw new Error(envelope.message || "API Error");
  }
  return envelope.data;
};

export const createSubtask = async (taskId, content) => {
  try {
    const response = await axios.post(`/tasks/${taskId}/subtask`, { content });
    return unwrap(response);
  } catch (err) {
    const msg = err?.response?.data?.message || "Error creating subtask";
    throw new Error(msg);
  }
};

export const getSubtasks = async (taskId) => {
  try {
    const response = await axios.get(`/tasks/${taskId}/subtask`);
    return unwrap(response);
  } catch (err) {
    const msg = err?.response?.data?.message || "Error fetching subtasks";
    throw new Error(msg);
  }
};

export const updateSubtask = async (taskId, subtaskId, updatedContent) => {
  try {
    const response = await axios.patch(
      `/tasks/${taskId}/subtask/${subtaskId}`,
      { content: updatedContent }
    );
    return unwrap(response);
  } catch (err) {
    const msg = err?.response?.data?.message || "Error updating the subtask";
    throw new Error(msg);
  }
};

export const deleteSubtask = async (taskId, subtaskId) => {
  try {
    const response = await axios.delete(
      `/tasks/${taskId}/subtask/${subtaskId}`
    );
    return unwrap(response);
  } catch (err) {
    const msg = err?.response?.data?.message || "Error deleting the subtask";
    throw new Error(msg);
  }
};
