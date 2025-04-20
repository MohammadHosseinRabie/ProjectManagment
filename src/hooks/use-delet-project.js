import axios from "axios"


const deletProject = async (id) => {
    const response = await axios.delete(`http://localhost:3001/projects/${id}`)
    return response.data;
};

export default deletProject;