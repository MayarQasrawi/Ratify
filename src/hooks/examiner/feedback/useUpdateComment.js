import { useAuthContext } from "@/contexts/AuthProvider";
import axiosInstance from "@/hooks/auth/utils/axiosInstance";
import Extract from "@/utils/Extract";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";

async function updateComment(info) {
  console.log(info,'updateComment endpoint ');
  const { data } = await axiosInstance.put(`Feedback/${info.id}`, info.body);
  return data;
}
export default function useUpdateComment() {
  const { auth } = useAuthContext();
  let id;
  if (auth) id = Extract(auth, "nameid");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>  updateComment(data),
    retry: false,
    onError: (error) => {
      console.log(error, "updateComment endpoint");
    },
    onSuccess: (data) => {
      console.log(data, "updateComment endpoint");
      queryClient.invalidateQueries(["feedback",id]);
    },
  });
}