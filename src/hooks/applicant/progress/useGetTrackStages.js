import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function getTrackStages(id) {
  const { data } = await axiosInstance.get(`Stages/${id}`);
  return data;
}
export default function useGetTrackStages(trackId) {
  return useQuery({
    queryKey: ["trackStagees", trackId],
    queryFn: () => getTrackStages(trackId),
    enabled: Boolean(trackId),
    staleTime: 5 * 60 * 1000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
