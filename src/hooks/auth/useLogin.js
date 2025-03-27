import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Extract from "../../utils/Extract";
import axiosInstance from "./utils/axiosInstance"; // Import the Axios instance

async function signin(data) {
  const response = await axiosInstance.post("/Auth/login", data); // Use axiosInstance
  return response.data;
}

export default function useSignin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => signin(data),
    retry: false,
    onError: (error) => {
      console.error("Error during login:", error.response);
    },
    onSuccess: (data) => {
      console.log("Signin successful:", data);
      localStorage.setItem("token", data.data); // Store the token in localStorage
      const role = Extract(data.data, "role"); // Extract the role from the token
      console.log(role);

      // Navigate based on the user's role
      switch (role) {
        case "Applicant":
          navigate("/");
          break;
        case "Admin":
          navigate("/dashboard/admin");
          break;
        case "Examiner":
          navigate("/dashboard/examiner");
          break;
        case "SeniorExaminer":
          navigate("/dashboard/seniorExaminer");
          break;
        default:
          navigate("/"); // Default fallback route
      }
    },
  });
}