import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function getTraksList() {
  const { data } = await axiosInstance.get("Tracks/active-list");
  return data;
}
export default function useGetTraksList() {
  return useQuery({
    queryKey: ["tracksList"],
    queryFn: getTraksList,
    retry: false,
    staleTime: 1000 * 60 * 8,
  });
}
