// hooks/applicant/useStageProgress.js
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/hooks/auth/utils/axiosInstance';

const useGetStage = (stageId) => {
  return useQuery({
    queryKey: ['stageProgress', stageId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/stage-progresses/${stageId}`);
      return response;
    },
    enabled: !!stageId, // يتم تنشيط الطلب فقط إذا كان stageId موجودًا
  });
};

export default useGetStage;