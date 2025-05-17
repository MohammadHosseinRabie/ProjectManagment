import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "./axios-client";

const fetchTasks = async (projectId) => {
  const { data } = await axiosClient.get(`/projects/${projectId}/tasks`);
  return data;
};

const useGetTasks = (projectId) => {
  return useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => fetchTasks(projectId),
  });
};

export default useGetTasks;
