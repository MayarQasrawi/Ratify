import { useMutation, useQueryClient} from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function updateWorkload(info) {
  console.log(info,'update workload examiner jjjjjjjjjjjj');
  const token = localStorage.getItem('token');
  const { data } = await axiosInstance.put(`Workloads/${info.id}`, {maxWorkLoad:info.maxWorkLoad} ,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return data;
}
export default function useUpdateWorkload() {
   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) =>  updateWorkload(data),
    retry: false,
    onError: (error) => {
      console.log(error?.response.data, "put workload error");
    },
    onSuccess: (data) => {
      console.log(data, "put workload Success");
       queryClient.invalidateQueries(["ExaminerByTrack"]);
    },
  });
}