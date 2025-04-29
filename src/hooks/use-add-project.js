import { axiosClient } from "./axios-client";


const addNewProject = async (newProject) => {
    const response = await axiosClient.post(`/projects/`, newProject);
    return response.data;
};


export default addNewProject;