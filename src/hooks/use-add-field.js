import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "./axios-client";

const addField = async ({ name, type, projectId }) => {
  const response = await axiosClient.post(`/projects/${projectId}/custom-fields`, {
    name,
    type,
    projectId,
  });
  return response.data;
};

const useAddField = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addField,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["custom-fields", variables.projectId]);
    },
  });
};

export default useAddField;