import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

const fetchExamRequestInfo = async (requestId) => {
  const response = await axiosInstance.get(`/exam-request/${requestId}/info`);
  return response.data.data;
};

const useGetExamRequestInfo = (requestId, options = {}) => {
  return useQuery({
    queryKey: ["examRequestInfo", requestId],
    queryFn: () => fetchExamRequestInfo(requestId),
    enabled: !!requestId,
    ...options,
  });
};

export default useGetExamRequestInfo;