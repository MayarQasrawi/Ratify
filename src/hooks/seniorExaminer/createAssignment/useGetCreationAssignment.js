import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function getCreationAssignment() {
  console.log("inside get CreationAssignments/senior end point");
  const token = localStorage.getItem("token");
  const { data } = await axiosInstance.get(`CreationAssignments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
export default function useGetCreationAssignment() {
  return useQuery({
    queryKey: ["seniorCreationAssignment"],
    queryFn: getCreationAssignment,
    retry: false,
    staleTime: 1000 * 60 * 8,
  });
}
