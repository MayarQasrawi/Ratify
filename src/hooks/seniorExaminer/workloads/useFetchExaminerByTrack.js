import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function fetchExaminersByTrack(id) {
  console.log(id,'fetch examiners')
  const { data } = await axiosInstance.get(`Tracks/${id}/examiners`, {
    headers: {
      Accept: "application/json",
    },
  });
  return data;
}
export default function useFetchExaminersByTrack(id) {
  return useQuery({
     queryKey: ["ExaminerByTrack"],
     queryFn: ()=>fetchExaminersByTrack(id), 
     retry: false ,
     staleTime: 1000 * 60 * 8 });
}