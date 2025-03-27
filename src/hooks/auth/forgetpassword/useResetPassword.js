import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";


async function resetPassword(data) {
  try {
    const response = await axiosInstance.post("/Auth/resetpassword", data);
    console.log("done ...");
    return response;
   
  } catch (error) {
    console.log("error.toJSON()", error.toJSON());

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("response:", error.response.data);
      console.log("response:", error.response.status);
      console.log("response:", error.response.body);
    } else if (error.request) {
      // The request was made but no response was received
      console.log("No response:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log("error.config:", error.config);
    throw error; // Re-throw the error to handle it in the calling function
  }
}

export default function useResetPassword(){
    return  useMutation({
     mutationFn:(data)=>resetPassword(data),
     retry:false,
     onSuccess:()=>{
         console.log('success')
    },
    onError:(error)=>{
     console.error("Error during reset:", error.response);
    }
    })
 }
 