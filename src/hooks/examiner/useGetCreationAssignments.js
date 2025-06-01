import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../auth/utils/axiosInstance";

async function getCreationAssignment(id) {
  console.log("getCreationAssignment end point ", id);
  const { data } = await axiosInstance.get(`CreationAssignments/examiner/${id}`);
  return data;
}
export default function useGetCreationAssignment(id,enable) {
  return useQuery({
    queryKey: ["CreationAssignment",id],
    queryFn: () => getCreationAssignment(id),
    retry: false,
    enable:enable,
    staleTime: 1000 * 60 * 8,
  });
}
