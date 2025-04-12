import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../auth/utils/axiosInstance";
  async function fetchAllExaminers() {
  const { data } = await axiosInstance.get(`Examiners?page=1&pageSize=10`,{headers: {
             
    'ngrok-skip-browser-warning': '1'
    
  }});
  console.log(data,'jjjjj')
  return data;
}
export default function useFetchAllExaminers(){
    return useQuery({
        queryKey:['examiners'],
        queryFn: () => fetchAllExaminers(),
        retry: false,
        onError: (error) => {
          console.log(error, "get exa");
        },
    })
}