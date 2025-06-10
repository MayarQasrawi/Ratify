import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../auth/utils/axiosInstance";
async function getStatisticalInfo() {
  const token = localStorage.getItem("token");
  const { data } = await axiosInstance.get(`Workloads/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
export default function useGetStatisticalInfo() {
  return useQuery({
    queryKey: ["statistical-info"],
    queryFn: getStatisticalInfo,
  });
}
