import axiosInstance from "@/hooks/auth/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

async function getCertificateInPdf(code) {
  console.log('getCertificateInPdf', code);
  const { data } = await axiosInstance.get(`Certificates/${code}/pdf`, {
    responseType: "blob", 
  });
  return data;
}

export default function useGetCertificateInPdf(code, enabled = true) {
  return useQuery({
    queryKey: ["pdfCertificate", code], 
    queryFn: () => getCertificateInPdf(code), 
    retry: false,
    enabled: enabled && !!code 
  });
}
