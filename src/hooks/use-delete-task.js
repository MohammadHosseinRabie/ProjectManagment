import { axiosClient } from "./axios-client"


const deleteTask = async (id) => {
    const response = await axiosClient.delete(`/tasks/${id}`)
    return response.data;
};



export default deleteTask;