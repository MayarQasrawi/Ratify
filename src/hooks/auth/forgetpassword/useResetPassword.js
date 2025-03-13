import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";


async function resetPassword(data){
    const response=await axios.post(`${import.meta.env.VITE_BAPI}/Auth/resetpassword`,data)
    return response;
}

export default function useResetPassword(){
    const navigate=useNavigate()
    return  useMutation({
     mutationFn:(data)=>resetPassword(data),
     retry:false,
     onSuccess:()=>{
        navigate('/login')
         console.log('success')
    },
    onError:(error)=>{
     console.error("Error during login:", error.response);
    }
    })
 }
 