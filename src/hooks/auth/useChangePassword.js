import { useMutation } from "@tanstack/react-query";
import axios from "axios";
async function changePassword(data){
    console.log(data)
    const response=await axios.post(`${import.meta.env.VITE_BAPI}/Auth/changepassword`,data);
    return response;
}
export default function useChangePassword(){

    return useMutation({
        mutationFn:(data)=> changePassword(data),
        retry: false,
        onError: (error) => {
           
                console.error("Server responded with:", error);
            
        },
        onSuccess: (data) => {
            console.log("changePassword successful:", data);
        }
    })
}