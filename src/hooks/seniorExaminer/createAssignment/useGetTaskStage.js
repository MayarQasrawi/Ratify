import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function getTaskStages(id) {
    console.log('inside get task stage end point',id)
  const { data } = await axiosInstance.get(`Tracks/${id}/task-stages`);
  return data;
}
export default function useGetTaskStages(id) {
  return useQuery({
    queryKey: ["tracksTaskStage"],
    queryFn: ()=>getTaskStages(id),
    retry: false,
    // staleTime: 1000 * 60 * 8,
  });
}