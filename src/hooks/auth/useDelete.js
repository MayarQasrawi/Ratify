import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./util/AxiosInstance"; 

async function deleteAccount(id) {
  const response = await axiosInstance.delete(`/Auth/${id}`);
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