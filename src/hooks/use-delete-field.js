import { axiosClient } from "./axios-client"


const deleteField = async ({id, projectId}) => {
    const response = await axiosClient.delete(`/projects/${projectId}/custom-fields/${id}`)
    return response.data;
};



export default deleteField;