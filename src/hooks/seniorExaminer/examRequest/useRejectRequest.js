import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function rejectRequest(request) {
  console.log('inside reject  exam end point',request)
  const { data } = await axiosInstance.put(`exam-request/${request.id}/reject`,request);
  return data;
}

export default function useRejectRequest() {
  return useMutation({
    mutationFn: (request) => rejectRequest(request),
    retry: false,
    onError: (error) => {
      console.log(error, `error i `);
      
    },
    onSuccess: (data) => {
      console.log(data, ` success`);
    },
  });
}