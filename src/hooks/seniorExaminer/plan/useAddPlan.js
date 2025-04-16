import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function addPlan(info) {
  const { data } = await axiosInstance.post(`Tracks/structure`, info);
  return data;
}
export default function useAddPlan() {
  return useMutation({
    mutationFn: (info) => addPlan(info),
    retry: false,
    onError: (error) => {
      console.log(error,'error add plan');
    },
    onSuccess: (data) => {
      console.log(data, "plan add");
    },
  });
}
