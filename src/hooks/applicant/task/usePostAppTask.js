import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/hooks/auth/utils/axiosInstance";

const usePostAppTask = (options) => {
  return useMutation({
    mutationKey: ["postAppTask"],
    mutationFn: async (data) => {
      const response = await axiosInstance.post(`/TaskSubmissions`, data);
      return response.data;
    },
    ...options, // ← هذه السطر هو المهم
  });
};

export default usePostAppTask;
