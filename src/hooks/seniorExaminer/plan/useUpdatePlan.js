import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function updatePlan({ endpoint, payload }) {
  console.log('iside update end point',endpoint,payload)
  const { data } = await axiosInstance.put(endpoint, payload);
  return data;
}

export default function useUpdatePlan() {
  return useMutation({
    mutationFn: ({ endpoint, payload }) => updatePlan({ endpoint, payload }),
    retry: false,
    onError: (error) => {
      console.log(error, `error in POST `);
      
    },
    onSuccess: (data) => {
      console.log(data, ` success`);
    },
  });
}
