import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function fetchCriteria(id){
    console.log('fetch task criteria /////////////////////////////////////////',id)
    const { data } = await axiosInstance.get(`EvaluationCriteria/stage/${id}`);
    return data;
}
export default function useFetchCriteria(id){
    return useQuery({
        queryKey:['stageCriteria',id],
        queryFn: () => fetchCriteria(id),
        retry:false
    })
}