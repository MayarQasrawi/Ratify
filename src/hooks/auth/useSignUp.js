import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
async function signup(data){
    const response=await axios.post(`${import.meta.env.VITE_BAPI}/Auth/register/applicant`,data);
    return response;
}
export default function useSignup(){
    const navigate=useNavigate()

    return useMutation({
        mutationFn:(data)=> signup(data),
        retry: false,
        onError: (error) => {
            if (error.response) 
                console.error("Server responded with:", error.response.data);
            
        },
        onSuccess: (data) => {
            console.log("Signup successful:", data);
            navigate('/login');
        }
    })
}