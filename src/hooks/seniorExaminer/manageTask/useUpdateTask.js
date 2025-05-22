import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function updateTask(info) {
  console.log(info,'inside update task  end point')
  const { data } = await axiosInstance.put("Task", info
  );
  return data;
}
export default function useUpdateTask() {
  return useMutation({
    mutationFn: (data) => updateTask(data),
    retry: false,
    onError: (error) => {
      console.log(error, "update task info");
    },
    onSuccess: (data) => {
      console.log(data,"update task info ");
    },
  });
}