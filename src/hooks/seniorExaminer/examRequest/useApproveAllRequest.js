import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function approveAllRequest(request) {
  console.log(request,'update bullk ')
  const { data } = await axiosInstance.put(`exam-request/bulk-update`,request);
  return data;
}

export default function useApproveAllRequest() {
  return useMutation({
    mutationFn: (request) => approveAllRequest(request),
    retry: false,
    onError: (error) => {
      console.log(error?.response.data, `error  `);
      
    },
    onSuccess: (data) => {
      console.log(data, ` success`);
    },
  });
}