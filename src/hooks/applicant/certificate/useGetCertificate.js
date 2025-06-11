import axiosInstance from "@/hooks/auth/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

async function getCertificate(code) {
  console.log("inside getCertificate ", code);
  const { data } = await axiosInstance.get(`Certificates/${code}`);
  return data;
}
export default function useGetCertificate(code, enabled = true) {
  return useQuery({
    queryKey: ["certificate",code],
    queryFn: () => getCertificate(code),
    retry: false,
     enabled: enabled && !!code ,
  });
}
