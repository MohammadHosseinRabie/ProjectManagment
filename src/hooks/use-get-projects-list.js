import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchProjects = async () => {
    const { data } = await axios.get("http://localhost:3001/projects")
    return data;
};

const getProjects = () => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: fetchProjects,
    });
};

export default getProjects;