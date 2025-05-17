import { axiosClient } from "./axios-client";

const putEditField = async ({ fieldId, projectId, name }) => {
  const { data } = await axiosClient.put(
    `/projects/${projectId}/custom-fields/${fieldId}`,
    { name }
  );
  return data;
};

export default putEditField;
