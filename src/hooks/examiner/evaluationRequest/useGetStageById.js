import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function getStageById(id) {
  console.log("inside get stage end point ", id);
  const { data } = await axiosInstance.get(`Stages/${id}`);
  return data;
}

export default function useGetStageById(id) {
  return useQuery({
     queryKey:['stage',id],
    queryFn: () => getStageById(id),
    retry: false,
  });
}
