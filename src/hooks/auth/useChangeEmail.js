import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./utils/axiosInstance";

async function ChangeEmail(data) {
  const response = await axiosInstance.put("/Auth/updateuseremail", data); 
  return response;
}

export default function useChangeEmail() {
  return useMutation({
    mutationFn: (data) => ChangeEmail(data),
    retry: false,
    onError: (error) => {
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      } else {
        console.error("Error during email update:", error.message);
      }
    },
    onSuccess: (data) => {
      console.log("Email update successful:", data);
    },
  });
}