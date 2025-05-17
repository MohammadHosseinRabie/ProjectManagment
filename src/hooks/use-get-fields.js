import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "./axios-client";

const fetchFields = async ({ fieldId, projectId }) => {
  const { data } = await axiosClient.get(
    `/projects/${projectId}/custom-fields/${fieldId}`
  );
  return data;
};

export default function useGetField(fieldId) {
  return useQuery({
    queryKey: ["fields", fieldId],
    queryFn: () => fetchFields(fieldId),
  });
}
