import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./utils/axiosInstance"; 

async function signup(data) {
  const response = await axiosInstance.post("/Auth/register/applicant", data);
  return response;
}

export default function useSignup() {
  return useMutation({
    mutationFn: (data) => signup(data),
    retry: false,
    onError: (error) => {
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      } else {
        console.error("Error during signup:", error.message);
      }
    },
    onSuccess: (data) => {
      console.log("Signup successful:", data);
    },
  });
}