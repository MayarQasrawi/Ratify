import { useMutation, useQueryClient} from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function addWorkload(workload) {
  console.log(workload, 'add workload inside end point');

  const token = localStorage.getItem('token');

  const { data } = await axiosInstance.post(
    `Workloads`,
    workload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}

export default function useAddWorkload() {
   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => addWorkload(data),
    retry: false,
    onError: (error) => {
      console.log(error, "add workload error");
    },
    onSuccess: (data) => {
      console.log(data, "add workload Success");
       queryClient.invalidateQueries(["ExaminerByTrack"]);
    },
  });
}
