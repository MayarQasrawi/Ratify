
import axiosInstance from "@/hooks/auth/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

async function getCertificateInHtml(code) {
  console.log('getCertificateInHtml', code);
  const { data } = await axiosInstance.get(`Certificates/html/${code}`);
  return data;
}

export default function useGetCertificateInHtml(code, enabled = true) {
  return useQuery({
    queryKey: ["htmlCertificate", code], 
    queryFn: () => getCertificateInHtml(code),
    retry: false,
    enabled: enabled && !!code 
  });
}