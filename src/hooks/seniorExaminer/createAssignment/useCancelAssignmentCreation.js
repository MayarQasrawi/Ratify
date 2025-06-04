import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function cancelAssignments(id) {
   const token = localStorage.getItem("token");
  console.log(id, "inside cancel assigment   end point",token);
   if (!token) {
    throw new Error("Authentication token not found.");
  }
  const { data } = await axiosInstance.put(
    `CreationAssignments/cancel/${id}`,{},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
}
export default function useCancelAssignments() {
   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => cancelAssignments(id),
    retry: false,
    onError: (error) => {
      console.log(error?.response.data, "inside cancel assinment");
    },
    onSuccess: (data) => {
      console.log(data, "inside cancel assigment");
      queryClient.invalidateQueries(["seniorCreationAssignment"]);
    },
  });
}
