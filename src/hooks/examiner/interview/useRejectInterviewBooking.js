import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

const rejectInterviewBooking = async (id) => {
  const response = await axiosInstance.put(`/InterviewBookings/${id}/reject`);
  return response.data;
};

const useRejectInterviewBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: rejectInterviewBooking,
    onSuccess: () => {
      // Invalidate and refetch interview bookings data
      queryClient.invalidateQueries({ queryKey: ["interview-bookings"] });
      queryClient.invalidateQueries({ queryKey: ["interview-bookings-applicant"] });
    },
  });
};

export default useRejectInterviewBooking;