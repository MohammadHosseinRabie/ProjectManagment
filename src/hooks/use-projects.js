import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "./axios-client";

const fetchProjects = async () => {
  const { data } = await axiosClient.get(`/projects`)
  return data;
};

const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchProjects(),
    keepPreviousData: true
  });
};

export default useProjects;
