import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function getTrackProgress(id) {
    console.log('enroll id',id)
  const { data } = await axiosInstance.get(`stage-progresses/enrollment/${id}`);
  return data;
}
export default function useGetTrackProgress(enrollId) {
  return useQuery({
    queryKey: ["trackProgress", enrollId],
    queryFn: () => getTrackProgress(enrollId),
    enabled: Boolean(enrollId),
    staleTime: 5 * 60 * 1000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
}