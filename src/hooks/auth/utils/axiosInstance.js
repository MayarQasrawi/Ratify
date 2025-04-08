import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BAPI, // Use the environment variable for the base URL
  // headers: {
  //   "Content-Type": "application/json",
  // },
  headers: {
             
    'ngrok-skip-browser-warning': '1'
    
  }
});
export default axiosInstance;
