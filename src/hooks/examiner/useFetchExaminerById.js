import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../auth/utils/axiosInstance";

async function fetchExaminerById(id) {
  const { data } = await axiosInstance.get(`Examiners/${id}`);
  return data;
}
export default function useFetchExaminerById(id,isExaminer){
    return useQuery({
        queryKey:['examiner',id],
        queryFn: () => fetchExaminerById(id),
        enabled:isExaminer && !!id ,
        staleTime: 1000 * 60 * 8, 
    })
}