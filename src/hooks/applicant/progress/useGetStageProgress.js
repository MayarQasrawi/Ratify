import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";


async function getLevelProgress(id) {
  const { data } = await axiosInstance.get(`stage-progresses/level-progress/${id}`);
  return data;
}


function useGetStageProgress({ levelProgressId }) {
  return useQuery({
    queryKey: ["stageProgress", levelProgressId],
    queryFn: () => getLevelProgress(levelProgressId),
    retry: true,
    select: (data) => {
      return data; // Extract the data from the response
    },
    onError: (error) => {
      console.error("Query Error:", error);
    },
  });
}

export default useGetStageProgress;