import React, { useEffect, useState } from "react";
import StageLayout from "../../components/applicant/dashboard/Stages/StageLayout";
import Container from "../../components/applicant/dashboard/general/Container";
import InterviewCard from "@/components/applicant/dashboard/Stages/interview/InterviewCard";
import CalendarBooking from "@/components/applicant/dashboard/Stages/interview/CalendarBooking";
import { useLocation } from "react-router-dom";
import { FiCalendar, FiExternalLink, FiFileText } from "react-icons/fi";
import Lottie from "lottie-react";
import animationData from "@/assets/img/animation/Appointment.json"; // Adjust the path as necessary
import StatusBadge from "@/components/applicant/dashboard/Stages/interview/StatusBadge ";
import useGetStage from "@/hooks/applicant/progress/useGetStage";
import MeetingInfoSection from "@/components/applicant/dashboard/Stages/interview/MeetingInfoSection";
import AIAssistantButton from "@/components/ai/AIAssistantButton";
function InterviewStage() {
  const { state } = useLocation();
  console.log("State from location:", state);
  
  // Initialize stageData from location state
  const [stageData, setStageData] = useState(state?.stage);
  const stageId = state?.stage?.stageId || null;
  console.log("Stage ID:", stageId);
  const interviewId = state?.stage?.additionalData?.interviewId;
  console.log("Interview ID 1:", interviewId);

  // Fetch stage data from API
  const {
    data,
    isLoading: isStageLoading,
    isSuccess,
    error
  } = useGetStage(state?.stage?.id);
  
  console.log("API data:", data);
  console.log("Is loading:", isStageLoading);
  console.log("Is success:", isSuccess);
  console.log("Error:", error);

  // Update stageData when API data is fetched successfully
  useEffect(() => {
    if (isSuccess && data) {
      console.log("Updating stageData with API data:", data);
      setStageData(prevStageData => ({
        ...prevStageData,
        ...data
      }));
    }
  }, [isSuccess, data]);

  // Log updated stageData
  useEffect(() => {
    console.log("Updated stageData:", stageData);
  }, [stageData]);

  const statusColors = {
    ReadyToBook: { bg: "bg-gray-100", text: "text-gray-600" },
    BookingPending: { bg: "bg-purple-100", text: "text-purple-600" },
    BookingScheduled: { bg: "bg-blue-100", text: "text-blue-600" },
    BookingCanceled: { bg: "bg-red-100", text: "text-red-600" },
    InterviewCompleted: { bg: "bg-green-100", text: "text-green-600" },
    Failed: { bg: "bg-red-100", text: "text-red-600" },
    Completed: { bg: "bg-green-100", text: "text-green-600" },
  };

  const color = statusColors[stageData?.actionStatus] || statusColors["ReadyToBook"];
 
  // Reusable container config
  const getContainerContent = (actionStatus, stageData) => {
    console.log("stageData?.actionStatus", actionStatus);
    
    switch (actionStatus) {
      case "ReadyToBook":
        return {
          header: "Interview Request",
          description:
            "No interview booking exists. Submit your request for an interview. Our team will review and schedule it for you.",
          children: (
            <CalendarBooking 
              stageId={stageId} 
              setStageData={setStageData} 
              interviewId={interviewId} 
            />
          ),
        };

      case "BookingPending":
        return {
          header: "Interview Request",
          description:
            "Interview booking request pending. Please wait for confirmation.",
          children: (
            <div className="flex flex-col gap-8 mt-4 items-center justify-center">
              <div className="border-2 border-gray-200 rounded-xl p-4 max-w-sm flex flex-col items-center">
                <div className="flex items-center justify-around gap-3 mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Status
                  </span>
                  <span
                    className={`text-sm font-semibold px-8 py-1 lg:px-[80px] rounded-md ${color.bg} ${color.text}`}
                  >
                    {actionStatus}
                  </span>
                </div>
                <p className="text-xs mt-4 text-gray-500">
                  Check your email for scheduling details.
                </p>
              </div>
            </div>
          ),
        };
        
      case "BookingScheduled":
        return {
          header: "Your Booking",
         
          children: (
            <div className="container mx-auto p-6">
              <MeetingInfoSection
                scheduledDate={
                  stageData?.additionalData?.scheduledDate || "Not set"
                }
                meetingLink={
                  stageData?.additionalData?.meetingLink || "Link not available"
                }
                animationData={animationData}
              />
    </div>
          ),
        };
        
      case "BookingCanceled":
        return {
          header: "Interview Request",
          description: "Booking canceled. You can book again.",
          children: (
            <CalendarBooking 
              stageId={stageId} 
              setStageData={setStageData} 
              interviewId={interviewId} 
            />
          ),
        };

      case "Failed":
      case "Completed":
        return {
          header: "Interview Status",
          description: `Interview ${actionStatus?.toLowerCase()}.`,
          children: (
            <div className="flex items-center justify-center p-10 gap-10 bg-gray-200/30 rounded-lg">
              <p className="text-gray-400 font-light text-2xl">
                Your interview status is 
              </p> 
              <StatusBadge status={actionStatus} />
            </div>
          )
        };

      default:
        return {
          header: "Interview Request",
          description:
            "No interview booking exists. Submit your request for an interview.",
          children: (
            <CalendarBooking 
              stageId={stageId} 
              setStageData={setStageData} 
              interviewId={interviewId} 
            />
          ),
        };
    }
  };

  // Show loading state while fetching data
  if (isStageLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-300 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </div>
      </div>
    );
  }

  // Show error state if there's an error
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-2">Error loading stage data</div>
          <p className="text-gray-600">{error.message || "Something went wrong"}</p>
        </div>
      </div>
    );
  }

  const { header, description, children } = getContainerContent(
    stageData?.actionStatus,
    stageData
  );

  return (
    <>
    <AIAssistantButton />
    <div>
      <StageLayout
        feedbackId={
          stageData?.actionStatus === "Reviewed" ||
          stageData?.actionStatus === "Completed" ||
          stageData?.actionStatus === "Failed" 
            ? stageData?.additionalData?.FeedbackId 
            : null
        }
        header="Interview"
        Children={
          <>
            {(["ReadyToBook", "BookingPending", "BookingScheduled", "BookingCanceled", "Failed", "Completed"].includes(stageData?.actionStatus || stageData)) && (
              <Container
                header={header}
                descriptions={description}
                children={children}
              />
            )}
            
            {(["ReadyToBook", "BookingPending", "BookingScheduled","BookingCanceled"].includes(stageData?.actionStatus)) && (
              <Container
                header="Interview Details"
                children={<InterviewCard id={stageId} />}
              />
            )}
          </>
        }
      />
    </div>
    </>
  );
}

export default InterviewStage;