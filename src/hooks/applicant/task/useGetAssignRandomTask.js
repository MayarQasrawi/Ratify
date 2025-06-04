import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/hooks/auth/utils/axiosInstance";

const useGetAssignRandomTask = (options) => {
  return useMutation({
    mutationKey: ["assignRandomTask"],
    mutationFn: async (StageProgressId) => {
      const response = await axiosInstance.post(`/TaskApplicants/assign-random`, { StageProgressId });
      return response.data;
    },
    ...options
  });
};

export default useGetAssignRandomTask;
