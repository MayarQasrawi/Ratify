import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function approveRequest(request) {
  console.log('ibside approve exam end point',request)
  const {scheduledDateTime,instructions}=request
  const info={scheduledDateTime,instructions}
  console.log(info,'info ,,,,,,,,,,,')
  const { data } = await axiosInstance.put(`exam-request/${request.id}/approve`,info);
  return data;
}

export default function useApproveRequest() {
  return useMutation({
    mutationFn: (request) => approveRequest(request),
    retry: false,
    onError: (error) => {
      console.log(error, `error i `);
      
    },
    onSuccess: (data) => {
      console.log(data, ` success`);
    },
  });
}