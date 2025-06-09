import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

const getExaminerInterviewBookings = async () => {
  const response = await axiosInstance.get(`/workloads/interview-requests`);
  return response.data.data;
};

const useExaminerInterviewRequest = ( ) => {
  return useQuery({
    queryKey: ["interview-requests"],
    queryFn: () => getExaminerInterviewBookings(),
  
  }

);
  
};

export default useExaminerInterviewRequest;