import { useMutation } from "@tanstack/react-query";
import axios from "axios";
async function addEmployee(data){
    const response=await axios.post(`${import.meta.env.VITE_BAPI}/Auth/register/examiner`,data);
    return response;
}
export default function useAddEmployee(){

    return useMutation({
        mutationFn:(data)=> addEmployee(data),
        retry: false,
        onError: (error) => {
            if (error.response) 
                console.error("Server responded with:", error.response.data);
            
        },
        onSuccess: (data) => {
            console.log("addEmployee successful:", data);
            
        }
    })
}