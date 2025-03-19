import { useMutation } from "@tanstack/react-query";
import axios from "axios";
async function deleteAccount(id){
    const response=await axios.delete(`${import.meta.env.VITE_BAPI}/Auth/${id}`);
    return response;
}
export default function useDelteAccount(){

    return useMutation({
        mutationFn:(id)=> deleteAccount(id),
        retry: false,
        onError: (error) => {
           
                console.error("Server responded with:", error);
            
        },
        onSuccess: (data) => {
            console.log("DelteAccount successful:", data);
        }
    })
}