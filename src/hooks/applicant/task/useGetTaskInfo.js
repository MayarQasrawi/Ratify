import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/hooks/auth/utils/axiosInstance';

const useGetTaskInfo = (taskId) => {
return useQuery({
  queryKey: ['taskInfo', taskId],
  queryFn: async () => {
    const response = await axiosInstance.get(`/AppTasks/${taskId}`);
    return response.data.data;
  },
  enabled: !!taskId, // تأكد من وجود ID قبل تنفيذ الطلب
  onError: (error) => {
    console.error('Error fetching task info:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch task info');
  },
   onSuccess: (data) => {
        console.log("Task info from api:", data);
       
      },
  
});

};

export default useGetTaskInfo;
