import { useMutation } from "@tanstack/react-query";
import axios from "axios";
async function ChangeEmail(data){
    const response=await axios.put(`${import.meta.env.VITE_BAPI}/Auth/updateuseremail`,data);
    return response;
}
export default function useChangeEmail(){
    return useMutation({
        mutationFn:(data)=> ChangeEmail(data),
        retry: false,
        onError: (error) => {
            if (error.response) 
                console.error("Server responded with:", error.response.data);
            
        },
        onSuccess: (data) => {
            console.log('update email done')
            console.log("ChangeEmail successful:", data);
        }
    })
}