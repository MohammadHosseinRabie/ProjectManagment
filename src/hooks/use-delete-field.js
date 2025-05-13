import { axiosClient } from "./axios-client"


const deleteField = async (id) => {
    const response = await axiosClient.delete(`/custom-fields/${id}`)
    return response.data;
};



export default deleteField;