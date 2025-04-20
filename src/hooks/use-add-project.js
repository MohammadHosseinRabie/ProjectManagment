import axios from "axios"


const addNewProject = async (newProject) => {
    const response = await axios.post(`http://localhost:3001/projects/`, newProject);
    return response.data;
};


export default addNewProject;