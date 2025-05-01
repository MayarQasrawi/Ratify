import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function fetchTrackById(id){
    const { data } = await axiosInstance.get(`Tracks/${id}`);
    return data;
}
export default function useFetchTrackById(id){
    return useQuery({
        queryKey:['track',id],
        queryFn: () => fetchTrackById(id),
        retry:false
    })
}