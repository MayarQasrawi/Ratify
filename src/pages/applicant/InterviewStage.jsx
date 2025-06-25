import React, { useEffect, useState } from "react";
import StageLayout from "../../components/applicant/dashboard/Stages/StageLayout";
import Container from "../../components/applicant/dashboard/general/Container";
import InterviewCard from "@/components/applicant/dashboard/Stages/interview/InterviewCard";
import CalendarBooking from "@/components/applicant/dashboard/Stages/interview/CalendarBooking";
import animationData from "@/assets/img/animation/Appointment.json"; // Adjust the path as necessary
import useGetStage from "@/hooks/applicant/progress/useGetStage";
import MeetingInfoSection from "@/components/applicant/dashboard/Stages/interview/MeetingInfoSection";
import { useParams } from "react-router-dom";
import LoadingStage from "@/pages/applicant/LoadingStage";
import { StatusDisplay } from "@/components/applicant/dashboard/Stages/Task/StatusContainer";
import AIAssistantButton from "@/components/ai/AIAssistantButton";
function InterviewStage() {
  
   const { stageProgressId } = useParams(); 
  console.log("State from param:", stageProgressId);

  // Initialize stageData from location state
  const [stageData, setStageData] = useState({});
  const stageId = stageData?.stageId || null;
  console.log("Stage ID:", stageId);
  const interviewId = stageData?.additionalData?.interviewId;
  console.log("Interview ID 1:", interviewId);

  // Fetch stage data from API
  const {
    data,
    isLoading: isStageLoading,
    isSuccess,
    error,
  } = useGetStage(stageProgressId);

  console.log("API data:", data);
  console.log("Is loading:", isStageLoading);
  console.log("Is success:", isSuccess);
  console.log("Error:", error);

  // Update stageData when API data is fetched successfully
  useEffect(() => {
    if (isSuccess && data) {
      console.log("Updating stageData with API data:", data);
      setStageData(data);
    }
  }, [isSuccess, data]);

  if(isStageLoading) {
    return <LoadingStage />;
  }


  const statusColors = {
    ReadyToBook: { bg: "bg-gray-100", text: "text-gray-600" },
    BookingPending: { bg: "bg-purple-100", text: "text-purple-600" },
    BookingScheduled: { bg: "bg-blue-100", text: "text-blue-600" },
    BookingCanceled: { bg: "bg-red-100", text: "text-red-600" },
    InterviewCompleted: { bg: "bg-green-100", text: "text-green-600" },
    Failed: { bg: "bg-red-100", text: "text-red-600" },
    Completed: { bg: "bg-green-100", text: "text-green-600" },
  };

  const color =
    statusColors[stageData?.actionStatus] || statusColors["ReadyToBook"];

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
            <StatusDisplay
              status={actionStatus}
              color={color}
              message={"Check your email for scheduling details."}
            />
          ),
        };

      case "BookingScheduled":
        return {
          header: "Your Booking",

          children: (
            <div className="container mx-auto p-6">
              <MeetingInfoSection
                scheduledDate={
                  stageData?.additionalData?.scheduledDate
                    ? new Date(
                        stageData.additionalData.scheduledDate
                      ).toLocaleDateString()
                    : "Not set"
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
            <StatusDisplay
              status={actionStatus}
              color={color}
              message={"This interview has been " + actionStatus.toLowerCase() + "."}
            />
          ),
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
     <LoadingStage/>
    );
  }

  // Show error state if there's an error
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          
          <div className="text-red-500 text-lg mb-2">
            Error loading stage data
          </div>
          <p className="text-gray-600">
            {error.message || "Something went wrong"}
          </p>
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
        feedbackId={stageData?.additionalData?.feedbackId}
        header="Interview"
        Children={
          <>
            {[
              "ReadyToBook",
              "BookingPending",
              "BookingScheduled",
              "BookingCanceled",
              "Failed",
              "Completed",
            ].includes(stageData?.actionStatus || stageData) && (
              <Container
                header={header}
                descriptions={description}
                children={children}
              />
            )}

            {[
              "ReadyToBook",
              "BookingPending",
              "BookingScheduled",
              "BookingCanceled",
            ].includes(stageData?.actionStatus) && (
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
