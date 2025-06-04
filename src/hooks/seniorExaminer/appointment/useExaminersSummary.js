import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

const getExaminersSummary = async (trackId) => {
  const response = await axiosInstance.get(`/Tracks/${trackId}/examiners-summary`);
  return response.data?.data;
};

const useExaminersSummary = (trackId) => {
  return useQuery({
    queryKey: ["examiners-summary", trackId],
    queryFn: () => getExaminersSummary(trackId),
    enabled: !!trackId, 
    staleTime: 5 * 60 * 1000, 
    cacheTime: 30 * 60 * 1000,
  });
};

export default useExaminersSummary;
