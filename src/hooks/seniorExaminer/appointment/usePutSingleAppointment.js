import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/hooks/auth/utils/axiosInstance";


const usePutSingleAppointment = () => {
     return useMutation({
     mutationFn: async (payload) => {
          const response = await axiosInstance.post("/Appointments", payload 
               
          );
          return response.data;
     },
     });
     }

export default usePutSingleAppointment;