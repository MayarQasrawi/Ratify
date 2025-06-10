import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function getSenior() {
  console.log('get Seniors end point ')
  const { data } = await axiosInstance.get(`Seniors`);
  return data;
}
export default function useGetSenior() {
  return useQuery({
     queryKey: ["seniors"],
     queryFn: getSenior, 
     retry: false ,
     staleTime: 1000 * 60 * 8 });
}