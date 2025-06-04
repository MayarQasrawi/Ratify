import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

const getExaminerDetails = async () => {
  const response = await axiosInstance.get(`/Seniors/tracks`);
  return response.data?.data;
};

const useExaminerDetails = (id) => {
  return useQuery({
    queryKey: ["examiner-details", id],
    queryFn: () => getExaminerDetails(id),
    staleTime: 5 * 60 * 1000, 
    cacheTime: 30 * 60 * 1000,
  });
};

export default useExaminerDetails;
