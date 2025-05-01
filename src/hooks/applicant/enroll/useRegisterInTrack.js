import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function registerInTrack({ applicantId, trackId }) {
  const response = await axiosInstance.put(
    `Enrollments/applicant/${applicantId}`,{trackId}
  );
  return response;
}
export default function useRegisterInTrack() {
  return useMutation({
    mutationFn: (data) => registerInTrack(data),
    onSuccess: (data) => {
      console.log(data, "register done");
    },
    onError: (err) => {
      console.log("error in register"), err;
    },
  });
}
