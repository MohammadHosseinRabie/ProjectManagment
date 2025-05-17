import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "./axios-client";

const addTaskToProject = async ({ title, description, projectId }) => {
  const response = await axiosClient.post(`/tasks`, {
    title,
    description,
    projectId,
  });
  console.log(response);
  return response.data;
};

const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTaskToProject,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["tasks", variables.projectId]);
    },
  });
};

export default useAddTask;
