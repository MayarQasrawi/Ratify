import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./auth/utils/axiosInstance";

async function uploadImage(info) {
  console.log(info, "imge go to api");
  const { data } = await axiosInstance.post(
    `Users/${info.id}/profile-image`,
    info.body,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
}
export default function useUploadImage() {
  return useMutation({
    mutationFn: (info) => uploadImage(info),
    retry: false,
    onError: (error) => {
      console.log(error, "put examiner img mmmmmmmmmmmmmmmmmmmm");
    },
    onSuccess: (data) => {
      console.log(data, "examiner upload done");
    },
  });
}
