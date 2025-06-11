import { useAuthContext } from "@/contexts/AuthProvider";
import axiosInstance from "@/hooks/auth/utils/axiosInstance";
import Extract from "@/utils/Extract";
import { useQuery } from "@tanstack/react-query";

async function getAllCertificate(id) {
    console.log('inside getAllCertificate ',id)
  const { data } = await axiosInstance.get(`Certificates/applicant/${id}`);
  return data;
}
export default function useGetAllCertificate() {
  const { auth } = useAuthContext();
  let id = "";
  if(auth)
  id = Extract(auth, "nameid");
  return useQuery({
    queryKey: ["certificate"],
    queryFn: () => getAllCertificate(id),
    retry: false,
    enabled:Boolean(id)
  });
}
