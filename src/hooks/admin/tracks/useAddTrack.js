import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function addTrack(info) {
  console.log(info,'add track')
  const response = await axiosInstance.post("Tracks", info, {
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
  });
  return response;
}
export default function useAddTrack() {
  return useMutation({
    mutationFn: (info) => addTrack(info),
    onSuccess: (data) => {
      console.log(data, "track add");
    },
    onError: (error) => {
      console.log("error done", error);
    },
  });
}
