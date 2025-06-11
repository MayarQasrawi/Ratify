import { useAuthContext } from "@/contexts/AuthProvider";
import axiosInstance from "@/hooks/auth/utils/axiosInstance";
import Extract from "@/utils/Extract";
import { useQuery } from "@tanstack/react-query";
async function getExaminerFeedback(id) {
  console.log("getExaminerFeedback", id);
  const { data } = await axiosInstance.get(`Feedback/by-examiner/${id}`);
  return data;
}
export default function useGetExaminerFeedback() {
  const { auth } = useAuthContext();
  let id = "";
  if (auth) id = Extract(auth, "nameid");
  console.log('43d35cbc-3fa1-4457-9a51-707e75a99ee9'==id,'llllllllllllllllll get feed')
  return useQuery({
    queryKey: ["feedback",id],
    queryFn: () => getExaminerFeedback(id),
  });
}
