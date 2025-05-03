import { axiosClient } from "./axios-client";


const addNewProject = async () => {
    const response = await axiosClient.post(`/projects`);
    return response.data;
};


export default addNewProject;