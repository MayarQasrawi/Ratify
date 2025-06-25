// hooks/applicant/useStageProgress.js
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/hooks/auth/utils/axiosInstance';

const useGetStage = ({stageProgressId,status}) => {
  return useQuery({
    queryKey: ['stageProgress', stageProgressId,status],
    queryFn: async () => {
      const response = await axiosInstance.get(`/stage-progresses/${stageProgressId}`);
      return response.data.data;
    },
    enabled: !!stageProgressId, 
  });
};

export default useGetStage;
