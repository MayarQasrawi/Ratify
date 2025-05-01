import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function fetchApplicantTracks(id) {
  console.log("fetching applicant tracks for ID:", id);
  const { data } = await axiosInstance.get(`/Enrollments/applicant/${id}`);
  return data;
}

export default function useGetApplicantTrack(applicantId) {
  return useQuery({
    queryKey: ["applicantTracks", applicantId],
    queryFn: () => fetchApplicantTracks(applicantId),
    enabled: Boolean(applicantId),
    staleTime: 5 * 60 * 1000,      // 5 minutes
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
