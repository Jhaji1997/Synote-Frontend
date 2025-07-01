import axios from "../lib/axios.js";

export const registerUser = async (formData) => {
  const response = await axios.post("/users/register", formData);
  return response.data;
};

export const loginUser=async(formData)=>{
  const response=await axios.post("/users/login",formData);
  return response.data
}