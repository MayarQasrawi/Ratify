import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function getTrackStructure(id){
    const { data } = await axiosInstance.get(`Tracks/${id}/structure`);
    return data;
}
export default function useGetTrackStructure(id){
    return useQuery({
        queryKey:['trackStructure',id],
        queryFn: () => getTrackStructure(id),
        retry:false,
        staleTime: 1000 * 60 * 8 ,
    })
}