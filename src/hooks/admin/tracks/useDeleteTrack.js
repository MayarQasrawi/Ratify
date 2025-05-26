import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function deleteTrack(id) {
  const response = await axiosInstance.delete(`Tracks/${id}`);
  return response;
}

export default function useDeleteTrack() {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteTrack(id),
    retry: false,
    onError: (error) => {
      console.error("delete track error:", error.response);
    },
    onSuccess: (data) => {
      console.log("DeleteTrack successful:", data);
      queryClient.invalidateQueries(["tracks"]);
    },
  });
}
