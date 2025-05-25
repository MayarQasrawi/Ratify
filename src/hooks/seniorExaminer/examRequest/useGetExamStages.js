import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function getExamStages(id) {
  console.log(id,'get exam stage request')
  const { data } = await axiosInstance.get(`exam-request/track/${id}/pending-summary`);
  return data;
}
export default function useGetExamStages() {
  return useQuery({
    queryKey: ["examStages"],
    queryFn: (id)=>getExamStages(id),
    retry: false,
    staleTime: 1000 * 60 * 8,
  });
}