import { axiosClient } from "./axios-client";


const addNewProject = async ({ name, description }) => {
    const response = await axiosClient.post(`/projects`, { name, description });
    return response.data;
};


export default addNewProject;