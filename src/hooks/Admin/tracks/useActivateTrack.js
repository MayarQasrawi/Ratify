import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../auth/utils/axiosInstance';

async function activateTrack(trackId) {
  console.log('inside track toggle end point',trackId)
  const response = await axiosInstance.put(`Tracks/${trackId}/restore`);
  return response.data;
}

export default function useActivateTrack() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: activateTrack,
    retry:false,
    onSuccess: () => {
      queryClient.invalidateQueries(['tracks']);
      console.log('track toggle success')
    },
  });
}
