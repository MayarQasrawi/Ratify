import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function getTaskCreation() {
  console.log("getTaskCreation end point");
  const token = localStorage.getItem("token");
  const { data } = await axiosInstance.get('Workloads/task-creations', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
export default function useGetTaskCreation(en) {
  console.log("getTaskCreation end point id",en);
  return useQuery({
    queryKey: ["taskCreation"],
    queryFn:  getTaskCreation,
    // staleTime: 1000 * 60 * 8,
    enabled:en
  });
}
