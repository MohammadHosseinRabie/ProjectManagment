import { axiosClient } from "./axios-client";

const login = async ({ email, password }) => {
  const response = await axiosClient.post("/auth/login", { email, password });
  return response.data;
};

export default login;
