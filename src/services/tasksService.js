import axios from "../lib/axios.js";

const unwrap = (response) => {
  const { data: envelope } = response;
  if (!envelope.success) {
    throw new Error(envelope.message || "API Error");
  }
  return envelope.data;
};

export const createTask = async (title, dueDate = null) => {
  try {
    const response = await axios.post("/tasks", { title, dueDate });
    return unwrap(response);
  } catch (err) {
    throw new Error(err?.response?.data?.message || "Error creating task");
  }
};

export const getAllTasks = async () => {
  try {
    const response = await axios.get("/tasks");
    return unwrap(response);
  } catch (err) {
    throw new Error(err?.response?.data?.message || "Error fetching tasks");
  }
};

export const getSpecificTask = async (taskId) => {
  try {
    const response = await axios.get(`/tasks/${taskId}`);
    return unwrap(response);
  } catch (err) {
    throw new Error(err?.response?.data?.message || "Error fetching the task");
  }
};

export const updateTask = async (taskId, updatedTitle, newDueDate) => {
  try {
    const response = await axios.patch(`/tasks/${taskId}`, {
      title: updatedTitle,
      dueDate: newDueDate,
    });
    return unwrap(response);
  } catch (err) {
    throw new Error(err?.response?.data?.message || "Error updating the task");
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`/tasks/${taskId}`);
    return unwrap(response);
  } catch (err) {
    throw new Error(err?.response?.data?.message || "Error deleting the task");
  }
};

export const getTaskWithSubtasks = async () => {
  try {
    const response = await axios.get("/tasks/tasks-with-subtasks");
    return unwrap(response);
  } catch (err) {
    throw new Error(
      err?.response?.data?.message || "Error fetching tasks with subtasks"
    );
  }
};
