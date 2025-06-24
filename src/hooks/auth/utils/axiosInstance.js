// api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BAPI,
  headers: {
    "ngrok-skip-browser-warning": "1",
  },
});

// Helper function to categorize errors 
function getErrorType(status) {
  switch (status) {
    case 404:
      return "not-found";
    case 401:
    case 403:
      return "unauthorized";
    case 500:
    case 502:
    case 503:
      return "server";
    case 429:
      return "rate-limit";
    case 408:
    case 504:
      return "timeout";
    default:
      return "unknown";
  }
}



// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Return successful response directly
    return response;
  },
  (error) => {
    let errorDetails;

    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const serverMessage = error.response?.data?.message || "An error occurred";

      errorDetails = {
        status,
        message: serverMessage,
        type: getErrorType(status),
      };

      console.log(`Error ${status}: ${serverMessage}`);
    } else {
      // Handle non-Axios errors
      errorDetails = {
        status: 0,
        message:
          typeof error === "string"
            ? error
            : error?.message || "An unknown error occurred",
        type: "unknown",
      };
    }

    // Attach error details to the error object for downstream handling
    error.errorDetails = errorDetails;

    // Reject the promise with the modified error
    return Promise.reject(error);
  }
);
// Request Interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;