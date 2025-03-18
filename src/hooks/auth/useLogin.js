import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Extract from "../../utils/Extract";

async function signin(data){
    const response = await axios.post(
        `${import.meta.env.VITE_BAPI}/Auth/login`,
        data
      );
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
                    navigate('/');
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