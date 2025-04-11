import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function getAllTraks() {
  const { data } = await axiosInstance.get("Tracks", {
    headers: {
      Accept: "application/json",
    },
  });
  return data;
}
export default function useGetAllTraks() {
  return useQuery({ queryKey: ["tracks"], queryFn: getAllTraks, retry: false });
}
