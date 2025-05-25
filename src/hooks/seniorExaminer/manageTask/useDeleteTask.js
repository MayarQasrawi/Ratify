import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function deleteTask(id) {
console.log('delete task inside end point',id)
  const response = await axiosInstance.delete(`AppTasks/${id}`);
  return response;
}

export default function useDeleteTask(poolId) {
  console.log(poolId,'insude delete task ')
   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteTask(id),
    retry: false,
    onError: (error) => {
      console.error("delete task error:", error.response);
    },
    onSuccess: (data) => {
      console.log("Delete Task successful:", data);
        queryClient.invalidateQueries(['allTasks',poolId]);
    },
  });
}