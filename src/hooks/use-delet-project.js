import { axiosClient } from "./axios-client";

const deletProject = async (id) => {
  const response = await axiosClient.delete(`/projects/${id}`);
  return response.data;
};

export default deletProject;
