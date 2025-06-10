import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function deleteManager(id) {
  console.log("delete manager end point", id);
  const token = localStorage.getItem("token");

  const response = await axiosInstance.delete(`Seniors/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export default function useDeleteManager() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteManager(id),
    retry: false,
    onError: (error) => {
      console.error(
        "delete track manager error:",
        error.response?.data || error.message
      );
    },
    onSuccess: (data) => {
      console.log("DeleteTrack manager successful:", data);
      queryClient.invalidateQueries(["tracks"]);
    },
  });
}
