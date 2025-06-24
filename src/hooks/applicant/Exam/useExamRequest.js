// hooks/useExamRequest.js
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance"; // Adjust the import path as necessary

const requestExam = async ({ stageId, applicantId, instructions = "", stageProgressId }) => {
  const response = await axiosInstance.post("/exam-request", {
    stageId,
    applicantId,
    instructions,
    stageProgressId
  });
  return response.data;
};

 function useExamRequest () {
  return useMutation({
    mutationFn: requestExam,
  });
};

export default useExamRequest;
