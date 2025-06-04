import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function fetchTaskStagePool(id){
    console.log('fetch task pool /////////////////////////////////////////',id)
    const { data } = await axiosInstance.get(`TasksPool/${id}`);
    return data;
}
export default function useFetchTaskPool(id){
    return useQuery({
        queryKey:['trackTaskStagePoll',id],
        queryFn: () => fetchTaskStagePool(id),
        retry:false
    })
}