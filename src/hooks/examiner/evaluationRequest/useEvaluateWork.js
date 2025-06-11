import axiosInstance from "@/hooks/auth/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";

async function evaluateWork(info) {
  console.log(info, "evaluateWork end point");
  const response = await axiosInstance.post("Feedback", info);
  return response;
}
export default function useEvaluateWork() {
  return useMutation({
    mutationFn: (info) => evaluateWork(info),
    onSuccess: (data) => {
      console.log(data, "evaluate work ");
    },
    onError: (error) => {
      console.log("error done inside evaluate work ", error?.response.data);
    },
  });
}