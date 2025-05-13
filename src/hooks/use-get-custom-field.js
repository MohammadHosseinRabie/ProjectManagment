import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "./axios-client";

const fetchCustomField = async (projectId) => {
  const { data } = await axiosClient.get(
    `/custom-fields/project/1723f8f3-b50a-4273-88dd-6a03d2474a87`
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
