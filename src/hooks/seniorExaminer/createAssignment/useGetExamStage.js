import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function getExamStages(id) {
    console.log('inside get exam stage end point',id)
  const { data } = await axiosInstance.get(`Tracks/${id}/exam-stages`);
  return data;
}
export default function useGetExamStages(id) {
  return useQuery({
    queryKey: ["tracksExamStage"],
    queryFn: ()=>getExamStages(id),
    retry: false,
    // staleTime: 1000 * 60 * 8,
  });
}