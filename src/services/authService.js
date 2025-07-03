import axios from "../lib/axios.js";

export const registerUser = async (formData) => {
  const response = await axios.post("/users/register", formData);
  return response.data;
};

export const loginUser = async (formData) => {
  const response = await axios.post("/users/login", formData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post("/users/logout");
  return response.data;
};

export const refreshAccessToken = async () => {
  const response = await axios.post("/users/refresh-tokens");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axios.get("/users/me");
  return response.data;
};

export const updateAvatar = async (avatarImage) => {
  const response = await axios.patch("/users/me",{avatarImage});
  return response.data;
};
