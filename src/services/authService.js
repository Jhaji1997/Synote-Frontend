import axios from "../lib/axios.js";

export const registerUser = async (formData) => {
  try {
    const response = await axios.post("/users/register", formData);
    return response.data;
  } catch (err) {
    throw err?.response?.data || { message: "Error registering user" };
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post("/users/login", formData);
    return response.data;
  } catch (err) {
    throw err?.response?.data || { message: "Error logging in" };
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post("/users/logout");
    return response.data;
  } catch (err) {
    throw err?.response?.data || { message: "Error logging out" };
  }
};

export const refreshAccessToken = async () => {
  try {
    const response = await axios.post("/users/refresh-tokens");
    return response.data;
  } catch (err) {
    throw err?.response?.data || { message: "Error refreshing token" };
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get("/users/me");
    return response.data;
  } catch (err) {
    throw err?.response?.data || { message: "Error fetching current user" };
  }
};

export const updateAvatar = async (avatarImage) => {
  try {
    const response = await axios.patch("/users/me", { avatarImage });
    return response.data;
  } catch (err) {
    throw err?.response?.data || { message: "Error updating avatar" };
  }
};
