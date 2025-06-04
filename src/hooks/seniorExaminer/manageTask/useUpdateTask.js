import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function updateTask(info) {
  console.log(info,'inside update task  end point')
  const { data } = await axiosInstance.put("AppTasks", info
  );
  return data;
}
export default function useUpdateTask(poolId) {
     const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateTask(data),
    retry: false,
    onError: (error) => {
      console.log(error, "update task info");
    },
    onSuccess: (data) => {
      console.log(data,"update task info ");
        queryClient.invalidateQueries(['allTasks',poolId]);
    },
  });
}