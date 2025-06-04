import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";


async function getLevelProgress(id) {

  const { data } = await axiosInstance.get(`level-progresses/enrollment/${id}`);
  return data;
}

function useGetLevelProgress({enrollmentId}) {


  return useQuery({
     queryKey: ["levelProgress", enrollmentId],
     queryFn: () => getLevelProgress(enrollmentId),
     retry: false,
   
     onError: (error) => {
          console.error("Query Error:", error);
     },


  });
  
}

export default useGetLevelProgress