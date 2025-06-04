import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/hooks/auth/utils/axiosInstance';

const useGetFeedback = (id) => {
  return useQuery({
    queryKey: ['feedback', id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/feedback/${id}`);
      return response.data.data;
    },
    enabled: !!id, 
  });
};

export default useGetFeedback;
