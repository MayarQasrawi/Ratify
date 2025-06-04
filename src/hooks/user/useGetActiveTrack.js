import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../auth/utils/axiosInstance";

async function getActiveTraks() {
  const { data } = await axiosInstance.get("Tracks/active", {
    headers: {
      Accept: "application/json",
    },
  });
  return data;
}
export default function useGetActiveTraks() {
  return useQuery({
     queryKey: ["activeTracks"],
     queryFn: getActiveTraks, 
     retry: false ,
     staleTime: 1000 * 60 * 8 });
}
