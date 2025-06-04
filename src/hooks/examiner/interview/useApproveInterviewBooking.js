import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

const approveInterviewBooking = async (id) => {
  const response = await axiosInstance.put(`/InterviewBookings/${id}/approve`);
  return response.data;
};

const useApproveInterviewBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: approveInterviewBooking,
    onSuccess: () => {
      // Invalidate and refetch interview bookings data
      queryClient.invalidateQueries({ queryKey: ["interview-bookings"] });
      queryClient.invalidateQueries({ queryKey: ["interview-bookings-applicant"] });
    },
  });
};

export default useApproveInterviewBooking;