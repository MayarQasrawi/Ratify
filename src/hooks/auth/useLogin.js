import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Extract from "../../utils/Extract";
import axiosInstance from "./utils/axiosInstance"; // Import the Axios instance

async function signin(data) {
  const response = await axiosInstance.post("/Auth/login", data); // Use axiosInstance
  return response.data;
}
export default function useSignin(){
    const navigate=useNavigate()
    return useMutation({
        mutationFn:(data)=> signin(data),
        retry: false,
        onError: (error) => {
            console.error("Error during login:", error.response);
        },
        onSuccess: (data) => {
            console.log("Signup successful:", data)
            localStorage.setItem('token', data.data);
            const role= Extract(data.data,'role')
            console.log(role)
            switch(role){
                case 'Applicant':
                    navigate('/Applicant');
                    break;
                case 'Admin':
                    navigate('/dashboard/admin');
                    break;
                case 'Examiner':
                    navigate('/dashboard/examiner');
                    break;
                case 'SeniorExaminer':
                    navigate('/dashboard/seniorExaminer');
                    break;
            }
        }
    })
}