import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function getPendingRequest(endpoint) {
  console.log("inside get evaluation end point  end point", endpoint);
  const token = localStorage.getItem("token");
  console.log(token, "inside get evaluation");
  const { data } = await axiosInstance.get(endpoint);
  return data;
}

export default function useGetPendingRequest({ endpoint, enable }) {
  return useQuery({
     queryKey:['pendingRequest',endpoint],
    queryFn: () => getPendingRequest(endpoint),
    enabled:enable ,
    retry: false,
  });
}
