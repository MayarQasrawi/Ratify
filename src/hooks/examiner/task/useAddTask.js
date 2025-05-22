import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function addTask(info) {
  console.log(info,'add task inside end point')
  const response = await axiosInstance.post("Task", info
  );
  return response;
}
export default function useAddTask() {
  return useMutation({
    mutationFn: (info) => addTask(info),
    onSuccess: (data) => {
      console.log(data, "task  add");
    },
    onError: (error) => {
      console.log("error done inside add task", error);
    },
  });
}