import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function updateTrack({ formData, id }) {
  console.log(formData, "inside update track end point", id);
  const { data } = await axiosInstance.put(`Tracks/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}
export default function useUpdateTrack() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateTrack(data),
    retry: false,
    onError: (error) => {
      console.log(error, "put track info");
    },
    onSuccess: (data) => {
      console.log(data, "put track info");
      queryClient.invalidateQueries(["tracks"]);
    },
  });
}
