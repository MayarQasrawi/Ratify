import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function updateStageDetails({ endpoint, payload }) {
  console.log('inside update stage detaild info   end point',endpoint,payload)
  const { data } = await axiosInstance.put(endpoint, payload);
  return data;
}

export default function useUpdateStageDetails() {
  return useMutation({
    mutationFn: ({ endpoint, payload }) => updateStageDetails({ endpoint, payload }),
    retry: false,
    onError: (error) => {
      console.log(error, `error in Pot update stage details  `);
      
    },
    onSuccess: (data) => {
      console.log(data, ` success update detail done`);
    },
  });
}