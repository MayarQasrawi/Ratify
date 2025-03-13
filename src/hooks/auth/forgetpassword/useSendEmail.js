import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function forgetPassword(data) {
  console.log(data.email, "inside asynch");
  const response = await axios.post(
    `${import.meta.env.VITE_BAPI}/Auth/forgotpassword`,
    JSON.stringify(data.email),
    {
        headers: {
          'Content-Type': 'application/json'  // Important - set content type to text/plain
        }
      }
  );
  return response;
}

export default function useSendEmail() {
  return useMutation({
    mutationFn: (data) => forgetPassword(data),
    retry: false,
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      console.error("Error during login:", error.response.data);
    },
  });
}
