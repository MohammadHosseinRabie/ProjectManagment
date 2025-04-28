import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTasks = async (projectId) => {
  const { data } = await axios.get(
    `http://localhost:3001/projects/${projectId}/tasks`
  );
  return data;
};

const getTasks = (projectId) => {
  return useQuery({
    queryKey: ["tasks", projectId],
    queryFn: fetchTasks(projectId),
  });
};

export default getTasks;
