import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "./axios-client";

const fetchCustomField = async (projectId) => {
  const { data } = await axiosClient.get(
    `/custom-fields?projectId=${projectId}`
  );
  return data;
};

const useGetCustomField = (projectId) => {
  return useQuery({
    queryKey: ["projects", projectId],
    queryFn: () => fetchCustomField(projectId),
  });
};

export default useGetCustomField;
