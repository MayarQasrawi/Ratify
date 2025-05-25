import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function updatePlan({ endpoint, payload }) {
  console.log('inside update plan  end point',endpoint,payload)
  const { data } = await axiosInstance.put(endpoint, payload);
  return data;
}

export default function useUpdatePlan(id) {
     const queryClient = useQueryClient();
console.log(id,'invalidate cashe /////////////////////')
  return useMutation({
    mutationFn: ({ endpoint, payload }) => updatePlan({ endpoint, payload }),
    retry: false,
    onError: (error) => {
      console.log(error, `error in POST `);
      
    },
    onSuccess: (data) => {
      console.log(data, ` success`);
      queryClient.invalidateQueries(['trackStructure',id]);
    },
  });
}
