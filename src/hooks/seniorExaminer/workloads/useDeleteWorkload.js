import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function deleteWorkload(id) {
    console.log(id,'iinside delelete end point')
      const token = localStorage.getItem('token');
  const response = await axiosInstance.delete(`Workloads/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return response;
}


export default function useDeleteWorkload(){
   const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(id)=> deleteWorkload(id),
        retry: false,
        onError: (error) => {
                console.error("error in delete workload", error);
        },
        onSuccess: (data) => {
            console.log("delete work load done", data);
             queryClient.invalidateQueries(["ExaminerByTrack"]);
        }
    })
}