import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function addTrack(info) {
  console.log(info, "add track");
  const response = await axiosInstance.post("Tracks", info, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
}
export default function useAddTrack() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (info) => addTrack(info),
    onSuccess: (data) => {
      console.log(data, "track add");
      queryClient.invalidateQueries(["tracks"]);
    },
    onError: (error) => {
      console.log("error done inside add track", error);
    },
  });
}
