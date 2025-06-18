// hooks/applicant/useStageProgress.js
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/hooks/auth/utils/axiosInstance';

const useGetStage = ({stageId,status}) => {
  return useQuery({
    queryKey: ['stageProgress', stageId,status],
    queryFn: async () => {
      const response = await axiosInstance.get(`/stage-progresses/${stageId}`);
      return response.data.data;
    },
    enabled: !!stageId, // يتم تنشيط الطلب فقط إذا كان stageId موجودًا
  });
};

export default useGetStage;
