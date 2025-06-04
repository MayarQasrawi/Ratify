import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function createAssignment(info) {
  console.log(info, "createAssignment end point");
  const token = localStorage.getItem("token");
  const response = await axiosInstance.post("CreationAssignments", info, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}
export default function useCreateAssignment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (info) => createAssignment(info),
    onSuccess: (data) => {
      console.log(data, "create Assignment");
      queryClient.invalidateQueries(["seniorCreationAssignment"]);
    },
    onError: (error) => {
      console.log("error done createAssignment", error?.response.data);
    },
  });
}
