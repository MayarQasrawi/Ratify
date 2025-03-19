import { useMutation } from "@tanstack/react-query";
import axios from "axios";


async function resetPassword(data){
    const response=await axios.post(`${import.meta.env.VITE_BAPI}/Auth/resetpassword`,data,
        {
            headers: {
                "Content-Type": "application/json"
            }
        })
    return response;
}

export default function useResetPassword(){
    return  useMutation({
     mutationFn:(data)=>resetPassword(data),
     retry:false,
     onSuccess:()=>{
         console.log('success')
    },
    onError:(error)=>{
     console.error("Error during reset:", error.response);
    }
    })
 }
 