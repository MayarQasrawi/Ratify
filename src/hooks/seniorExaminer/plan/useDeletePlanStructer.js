import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function deletePlanStructer(endPoint) {
  console.log(endPoint,'end point inside delete')
  const { data } = await axiosInstance.delete(endPoint);
  return data;
}
export default function useDeletePlanStructer() {
  return useMutation({
    mutationFn: (endPoint) => deletePlanStructer(endPoint),
    retry: false,
    onError: (error) => {
      console.error("Server responded with:", error);
    },
    onSuccess: (data) => {
      console.log("Delete Plan Structer successful:", data);
    },
  });
}
