import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function getAllTask(id){
    console.log('get all task  /////////////////////////////////////////',id)
    const { data } = await axiosInstance.get(`AppTasks/by-pool/${id}`);
    return data;
}
export default  function useGetAllTask(poolId, options = {}) {
  return useQuery({
    queryKey: ['allTasks', poolId],
    queryFn: () => getAllTask(poolId),
    staleTime: 1000 * 60 * 8 ,
    retry: false,
    enabled: options.enabled,
    ...options,
  });
}