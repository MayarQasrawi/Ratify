import {useMutation} from '@tanstack/react-query';
import axiosInstance from '@/hooks/auth/utils/axiosInstance';

const usePutAppointmentBulk = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await axiosInstance.post('/appointments/bulk', payload);
      return response.data;
    },
  });
};

export default usePutAppointmentBulk;
