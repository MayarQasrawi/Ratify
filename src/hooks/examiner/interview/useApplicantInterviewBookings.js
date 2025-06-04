import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

const getApplicantInterviewBookings = async (applicantId) => {
  const response = await axiosInstance.get(`/InterviewBookings/applicant/${applicantId}`);
  return response.data.data;
};

const useApplicantInterviewBookings = (applicantId) => {
  return useQuery({
    queryKey: ["interview-bookings-applicant", applicantId],
    queryFn: () => getApplicantInterviewBookings(applicantId),
    enabled: !!applicantId, // prevent query from running if applicantId is undefined
  });
};

export default useApplicantInterviewBookings;