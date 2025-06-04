import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function getPendingExamRequest(id) {
  console.log(id,'get exam stage end point  request')
  const { data } = await axiosInstance.get(`exam-request/stage/${id}/pending`);
  return data;
}
export default function useGetPendingExamRequest(id) {
  return useQuery({
    queryKey: ["pendingExamRequest",id],
    queryFn: ()=>getPendingExamRequest(id),
    retry: false,
    // staleTime: 1000 * 60 * 8,
  });
}