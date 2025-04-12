import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../auth/utils/axiosInstance";
import { useAuthContext } from "../../contexts/AuthProvider";
import Extract from "../../utils/Extract";

async function updateExaminerInfo(info) {
  console.log(info,'examiner');
  const { data } = await axiosInstance.put(`Examiners/${info.id}`, info.body);
  return data;
}
export default function useUpdateExaminerInfo() {
  const { auth } = useAuthContext();
  let id;
  if (auth) id = Extract(auth, "nameid");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateExaminerInfo(data),
    retry: false,
    onError: (error) => {
      console.log(error, "put examiner info");
    },
    onSuccess: (data) => {
      console.log(data, "examiner info");
      queryClient.invalidateQueries(["examiner", id]);
    },
  });
}
