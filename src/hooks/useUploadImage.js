import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./auth/utils/axiosInstance";

async function uploadImage(info) {
  console.log(info, "imge");
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
    onError: (error) => {
      console.log(error, "put examiner img");
    },
    onSuccess: (data) => {
      console.log(data, "examiner upload done");
    },
  });
}
