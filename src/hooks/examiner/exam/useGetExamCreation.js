import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function getExamCreation() {
  console.log("getExamCreation end point");
  const token = localStorage.getItem("token");
  const { data } = await axiosInstance.get('Workloads/exam-creations', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
export default function useGetExamCreation(en) {
  console.log("getExamCreation end point ",en);
  return useQuery({
    queryKey: ["examCreation"],
    queryFn:  getExamCreation,
    // staleTime: 1000 * 60 * 8,
    enabled:en
  });
}