import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../auth/utils/axiosInstance';


async function assignManagerToTrack(data) {
    const token = localStorage.getItem('token');
  console.log('data assign manager////////////////',data)
  const res= await axiosInstance.post('Seniors/assign', data,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  return res;}

export function useAssignManagerToTrack() {
  return useMutation({
    mutationFn:(data)=> assignManagerToTrack(data),
     retry: false,
    onError: (error) => {
      console.log(error, "put  manger error");
    },
    onSuccess: (data) => {
      console.log(data,"put track manger success");
    },
  });
}
