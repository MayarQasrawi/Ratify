import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./utils/axiosInstance"; // Import the Axios instance

async function changePassword(data) {
  console.log(data); // Log the data being sent
  const response = await axiosInstance.post("/Auth/changepassword", data); // Use axiosInstance
  return response;
}

export default function useChangePassword() {
  return useMutation({
    mutationFn: (data) => changePassword(data),
    retry: false,
    onError: (error) => {
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      } else {
        console.error("Error during password change:", error.message);
      }
    },
    onSuccess: (data) => {
      console.log("Password change successful:", data);
    },
  });
}