import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";
import { useAuthContext } from "../../../contexts/AuthProvider";
import Extract from "../../../utils/Extract";
async function registerInTrack(data) {
  console.log("register applican inside end point ", data);
  const response = await axiosInstance.post(
    `Enrollments/applicant/${data.userId}`,
    { trackId: data.trackId }
  );
  return response;
}
export default function useRegisterInTrack() {
  const { auth } = useAuthContext();
  let id;
  if (auth) id = Extract(auth, "nameid");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => registerInTrack(data),
    onSuccess: (data) => {
      console.log(data, "register done sucess hh");
      queryClient.invalidateQueries(["applicantTracks", id]);
    },
    onError: (err) => {
      console.log("error in register"), err;
    },
  });
}
