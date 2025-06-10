import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./auth/utils/axiosInstance";

async function getNotifications() {
  const token = localStorage.getItem("token");
  const { data } = await axiosInstance.get("Notifications", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
export default function useGetNotifications() {
  return useQuery({
    queryKey: ["Notifications"],
    queryFn: getNotifications,
    retry: false,
  });
}
