import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function addStage(info) {
    console.log('add stage info kkkkkkkkkkkkkkkkkkkkkkkkk',info.id,info.info)
  const { data } = await axiosInstance.post(`Levels/${info.id}/stages/bulk`, info.info);
  return data;
}
export default function useAddStage() {

  return useMutation({
    mutationFn: (info) => addStage(info),
    retry: false,
    onError: (error) => {
      console.log(error?.response.data, "error add stage");
    },
    onSuccess: (data) => {
      console.log(data, "plan add");
    },
  });
}