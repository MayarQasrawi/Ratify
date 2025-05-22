import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function updateTrack(info) {
  console.log(info,'inside update end point')
  const { data } = await axiosInstance.put("Tracks", info, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}
export default function useUpdateTrack() {
  return useMutation({
    mutationFn: (data) => updateTrack(data),
    retry: false,
    onError: (error) => {
      console.log(error, "put track info");
    },
    onSuccess: (data) => {
      console.log(data,"put track info");
    },
  });
}
