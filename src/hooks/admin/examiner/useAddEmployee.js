import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";
async function addEmployee(data) {
  const response = await axiosInstance.post(`Auth/register/examiner`, data);
  return response;
}
export default function useAddEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => addEmployee(data),
    retry: false,
    onError: (error) => {
      if (error.response)
        console.error("Server responded with:", error.response.data);
    },
    onSuccess: (data) => {
      console.log("addEmployee successful:", data);
      queryClient.invalidateQueries(["tracks"]);
    },
  });
}
