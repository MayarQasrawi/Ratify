import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function fetchTaskStage(id){
    console.log('fetch task stages /////////////////////////////////////////',id)
    const { data } = await axiosInstance.get(`Tracks/${id}/task-stages`);
    return data;
}
export default function useFetchTaskStage(id){
    return useQuery({
        queryKey:['trackTaskStage',id],
        queryFn: () => fetchTaskStage(id),
         staleTime: 1000 * 60 * 8 ,
        retry:false
    })
}