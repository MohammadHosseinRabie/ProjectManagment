import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "./axios-client";

const fetchCustomField = async (projectId) => {
  const { data } = await axiosClient.get(
    `/projects/${projectId}/custom-fields`
  );
  return data;
};

const useGetCustomField = (projectId) => {
  return useQuery({
    queryKey: ["fields", projectId],
    queryFn: () => fetchCustomField(projectId),
  });
};

export default useGetCustomField;
