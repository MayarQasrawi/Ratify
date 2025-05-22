import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function restorePlan(endPoint) {
  console.log('inside restore plan structer  end point',endPoint)
  const { data } = await axiosInstance.put(endPoint);
  return data;
}

export default function useRestorePlanStructer() {
  return useMutation({
    mutationFn: (endPoint) => restorePlan(endPoint),
    retry: false,
    onError: (error) => {
      console.log(error, `error in restore plan structer `);
      
    },
    onSuccess: (data) => {
      console.log(data, ` success in restore plan structer `);
    },
  });
}