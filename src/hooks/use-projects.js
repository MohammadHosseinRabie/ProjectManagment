import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProjects = async (page) => {
  const { data } = await axios.get(`http://localhost:3001/projects?_page=${page}&_per_page=10`)
  return data;
};

const useProjects = (page) => {
  return useQuery({
    queryKey: ["projects", page],
    queryFn: () => fetchProjects(page),
    keepPreviousData: true
  });
};

export default useProjects;
