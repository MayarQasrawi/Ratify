import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function deleteManager(id) {
  console.log('delete manager end point',id)  
  const response = await axiosInstance.delete(`Seniors/${id}`);
  return response;
}

export default function useDeleteManager() {
  return useMutation({
    mutationFn: (id) => deleteManager(id),
    retry: false,
    onError: (error) => {
      console.error("delete track manager error:", error.response);
    },
    onSuccess: (data) => {
      console.log("DeleteTrack manager successful:", data);
    },
  });
}