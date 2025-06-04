// src/hooks/useGetExamInfo.js
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

const fetchExamInfo = async (stageId) => {
  const response = await axiosInstance.get(`Exams/${stageId}`);
  return response.data;
};

const useGetExamInfo = (stageId, options = {}) => {
  return useQuery({
    queryKey: ["examInfo", stageId],
    queryFn: () => fetchExamInfo(stageId),
    enabled: !!stageId, 
    ...options,
  });
};

export default useGetExamInfo;
