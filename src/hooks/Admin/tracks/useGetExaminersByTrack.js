import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function getExaminersByTrack(id) {
  console.log(id,'fetch examiners by track')
  const { data } = await axiosInstance.get(`Tracks/${id}/examiners-summary`);
  return data;
}
export default function useGetExaminersByTrack(id) {
  return useQuery({
     queryKey: ["ExaminerByTrack",id],
     queryFn: ()=>getExaminersByTrack(id), 
     retry: false ,
     staleTime: 1000 * 60 * 8 });
}