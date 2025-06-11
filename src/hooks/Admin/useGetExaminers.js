import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axiosInstance from "../auth/utils/axiosInstance";


const fetchTeamMembers = async ({ queryKey }) => {
     // Destructure from queryKey array
     const [_key, { page, pageSize }] = queryKey;
     
     const response = await axiosInstance.get("Examiners", {
       params: { page: page, pageSize: pageSize }
     });
     console.log(response.data.data.data);
     return response.data;

   };
   
function useGetExaminers({ page, itemsPerPage }) {
  return useQuery({
    queryKey: ["teamMembers", { page, pageSize: itemsPerPage }],
    queryFn: fetchTeamMembers,
    placeholderData: keepPreviousData,
    retry: 1
  });
}

   
   export default useGetExaminers