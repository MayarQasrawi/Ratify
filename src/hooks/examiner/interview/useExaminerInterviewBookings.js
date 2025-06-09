import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

const getExaminerInterviewBookings = async () => {
  const response = await axiosInstance.get(`/workloads/scheduled-interviews`);
  return response.data.data;
};

const useExaminerInterviewBookings = ( ) => {
  return useQuery({
    queryKey: ["interview-bookings"],
    queryFn: () => getExaminerInterviewBookings(),
    // cacheTime: 10 * 60 * 1000, // Cache data for 10 minutes (600,000 ms)
    // staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes (300,000 ms)
  }

);
  
};

export default useExaminerInterviewBookings;