import { useQuery } from "@tanstack/react-query";
import axios from "axios";
async function fetchApplicantTracks({ queryKey }){
  const [, applicantId] = queryKey;
 const response=await axios.get(`${import.meta.env.VITE_BAPI}`);
 console.log(response)
 return response;
}
export default function useApplicantTrack(applicantId){
    return useQuery({
        queryKey: ["applicantTracks", applicantId], 
        queryFn: fetchApplicantTracks,
        enabled: !!applicantId, 
        staleTime: 2 * 60 * 1000, 
        refetchOnReconnect: false, 
        refetchOnWindowFocus: false,
        onError: (error) => {
            if (error.response) 
                console.error("Server responded with:", error.response.data);
            
        },
        onSuccess: (data) => {
            console.log("check successful:", data);
            
        }   
    })
}