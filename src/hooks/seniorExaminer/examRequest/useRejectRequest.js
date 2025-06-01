import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function rejectRequest(request) {
  console.log("inside reject  exam end point", request);
  const { data } = await axiosInstance.put(
    `exam-request/${request.id}/reject?message=${request.reason}`
  );
  return data;
}

export default function useRejectRequest(id) {
  const queryClient = useQueryClient();
console.log(id,'inside reject ')
  return useMutation({
    mutationFn: (request) => rejectRequest(request),
    retry: false,
    onError: (error) => {
      console.log(error?.response.data, `error i `);
    },
    onSuccess: (data) => {
      console.log(data, `success`);
      queryClient.invalidateQueries(["pendingExamRequest", id]);
      queryClient.refetchQueries(["pendingExamRequest", id]);
    },
  });
}
