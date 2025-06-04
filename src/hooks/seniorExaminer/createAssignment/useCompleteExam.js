import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function completeExam(id) {
   const token = localStorage.getItem("token");
  console.log(id, "inside completeExam  end point",token);
   if (!token) {
    throw new Error("Authentication token not found.");
  }
  const { data } = await axiosInstance.put(
    `CreationAssignments/exam-completed/${id}`,{},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
}
export default function useCompleteExam() {
   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => completeExam(id),
    retry: false,
    onError: (error) => {
      console.log(error?.response.data, "inside completeExam");
    },
    onSuccess: (data) => {
      console.log(data, "inside completeExam");
      queryClient.invalidateQueries(["seniorCreationAssignment"]);
    },
  });
}