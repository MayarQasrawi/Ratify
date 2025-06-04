import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/hooks/auth/utils/axiosInstance';

const getInterviewInfo = async ({ queryKey }) => {
  const [, stageId] = queryKey;
  const response = await axiosInstance.get(`/interviews/${stageId}`);
  return response.data;
};

const useGetInterviewInfo = (stageId) => {
  return useQuery({
    queryKey: ['interviewInfo', stageId],
    queryFn: getInterviewInfo,
    enabled: !!stageId, // avoid running query if stageId is undefined or null
  });
};

export default useGetInterviewInfo;
