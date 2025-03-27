import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance"; // Import the Axios instance

async function forgetPassword(data) {
  console.log(data.email, "inside async function"); // Log the email being sent
  const response = await axiosInstance.post("/Auth/forgotpassword", data); // Use axiosInstance
  return response;
}

export default function useSendEmail() {
  return useMutation({
    mutationFn: (data) => forgetPassword(data),
    retry: false,
    onSuccess: () => {
      console.log("Email sent successfully");
    },
    onError: (error) => {
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      } else {
        console.error("Error during email sending:", error.message);
      }
    },
  });
}