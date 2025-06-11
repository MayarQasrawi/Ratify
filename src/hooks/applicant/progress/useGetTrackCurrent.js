import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function getTrackProgressCurrent(id) {
    console.log('enroll id',id)
  const { data } = await axiosInstance.get(`stage-progresses/enrollment/${id}/current`);
  return data;
}
export default function useGetTrackProgressCurrent(enrollId) {
  return useQuery({
    queryKey: ["trackcurrent", enrollId],
    queryFn: () => getTrackProgressCurrent(enrollId),
    enabled: Boolean(enrollId),
    staleTime: 5 * 60 * 1000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: true,
  });
}