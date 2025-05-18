import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "./axios-client";

const addOption = async ({ projectId, fieldId, options }) => {
  const response = await axiosClient.post(
    `/projects/${projectId}/custom-fields/${fieldId}/options`,
    { options, projectId, fieldId }
  );
  return response.data;
};

const useAddOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addOption,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["options", variables.projectId]);
    },
  });
};

export default useAddOption;
