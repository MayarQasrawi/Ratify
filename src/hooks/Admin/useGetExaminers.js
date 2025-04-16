import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../auth/utils/axiosInstance";


const fetchTeamMembers = async ({ queryKey }) => {
     // Destructure from queryKey array
     const [_key, { page, pageSize }] = queryKey;
     
     const response = await axiosInstance.get("/Examiners", {
       params: { pageNumber: page, pageSize: pageSize }
     });
     return response.data;
   };
   
   function useGetExaminers({ currentPage, itemsPerPage }) {
     return useQuery({
               queryKey: ["teamMembers", { page: currentPage, pageSize: itemsPerPage }],
               queryFn: fetchTeamMembers,
               keepPreviousData: true,
              
             });
     
   }
   
   export default useGetExaminers