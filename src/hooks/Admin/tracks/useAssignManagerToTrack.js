import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../auth/utils/axiosInstance';


async function assignManagerToTrack(data) {
  const res= await axiosInstance.post('Seniors/assign', data)
  return res;}

export function useAssignManagerToTrack() {
  return useMutation({
    mutationFn:(data)=> assignManagerToTrack(data),
     retry: false,
    onError: (error) => {
      console.log(error, "put track manger error");
    },
    onSuccess: (data) => {
      console.log(data,"put track manger success");
    },
  });
}
