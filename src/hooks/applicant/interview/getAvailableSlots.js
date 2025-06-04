import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/hooks/auth/utils/axiosInstance';

const getAvailableSlots = async ({ queryKey }) => {
  const [, applicantId, stageId] = queryKey;
  const response = await axiosInstance.get(`/appointments/slots/applicant/${applicantId}/stage/${stageId}`);
  return response.data.data;
};

const useGetAvailableSlots = ({applicantId, stageId}) => {
  return useQuery({
    queryKey: ['availableSlots', applicantId, stageId],
    queryFn: getAvailableSlots,
    enabled: !!applicantId && !!stageId, 
  });
};

export default useGetAvailableSlots;
