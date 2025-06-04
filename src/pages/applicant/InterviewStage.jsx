import React from "react";
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
import { useState } from "react";
function InterviewStage() {
  const { state } = useLocation();
  console.log("State from location:", state);
  // Extract stage from state, default to "ReadyToBook" if not found or invalid
  const stageData = state?.stage 
  const stage = stageData?.actionStatus || "ReadyToBook";
  const stageId = stageData?.stageId || null;

  // const { 
  //   data, 
  //   isLoading: isStageLoading, 
  //   refetch: refetchStage 
  // } = useGetStage(stageData?.stageId);


  
  // const [currentStage, setCurrentStage] = useState(stage);
  // const [currentStageData, setCurrentStageData] = useState(stageData);

  const statusColors = {
    ReadyToBook: { bg: "bg-gray-100", text: "text-gray-600" },
    BookingPending: { bg: "bg-purple-100", text: "text-purple-600" },
    BookingScheduled: { bg: "bg-blue-100", text: "text-blue-600" },
    BookingCanceled: { bg: "bg-red-100", text: "text-red-600" },
    InterviewCompleted: { bg: "bg-green-100", text: "text-green-600" },
  };

  const color = statusColors[stage] || statusColors["ReadyToBook"];
 
  // Reusable container config
  const getContainerContent = (stage, stageData) => {
    switch (stage) {
      case "ReadyToBook":
        return {
          header: "Interview Request",
          description:
            "No interview booking exists. Submit your request for an interview. Our team will review and schedule it for you.",
          children: <CalendarBooking />,
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
                    {stage}
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
          header: "Your Interview",
          description: `Interview scheduled for ${
            stageData.additionalData.scheduledDate || "TBD"
          }. Join via: ${
            stageData.additionalData.meetingLink || "Link not available"
          }`,
          children: (
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between mt-4">
              {/* Information Section */}
              <div className="space-y-4 md:w-96">
                {/* Scheduled Date */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <FiCalendar className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 font-medium">
                      Scheduled Date
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {stageData.additionalData.scheduledDate || "Not set"}
                    </p>
                  </div>
                </div>

                {/* Meeting Link */}
                <div className="pt-2">
                  <a
                    href={stageData.additionalData.meetingLink}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[var(--main-color)] hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiExternalLink className="w-4 h-4" />
                    Join Meeting
                  </a>
                </div>
              </div>
              <div className="w-48 h-48 md:w-96 md:h-96">
                <Lottie animationData={animationData} loop={true} />
              </div>
            </div>
          ),
        };
      case "BookingCanceled":
        return {
          header: "Interview Request",
          description: "Booking canceled. You can book again.",
          children: <CalendarBooking />,
        };

      case "Failed":
      case "Completed":
        return {
          header: "Interview Status",
          // description: `Interview ${stage.toLowerCase()}.`,
          children: (
            <div className="flex items-center justify-center p-10  gap-10 bg-gray-200/30 rounded-lg">
              <p className="text-gray-400 font-light text-2xl">Your interview status is </p> <StatusBadge status={stage} />
            </div>
          )
        };

      default:
        return {
          header: "Interview Request",
          description:
            "No interview booking exists. Submit your request for an interview.",
          children: <CalendarBooking stageId={stageId}  />,
        };
    }
  };

  const { header, description, children } = getContainerContent(
    stage,
    stageData
  );

  return (
    <div>
      <StageLayout
      
        feedbackId={stage === "Reviewed"||stage === "Completed"||stage === "Failed" ? stageData?.additionalData?.FeedbackId : null}
        header="Interview"
        Children={
          
          <>
           {(["ReadyToBook", "BookingPending", "BookingScheduled", "BookingCanceled","Failed","Completed"].includes(stage.actionStatus || stage)) && (
           
           <Container
              header={header}
              descriptions={description}
              children={children}
            />
          )}
          {(["ReadyToBook", "BookingPending", "BookingScheduled",""].includes(stage.actionStatus || stage)) && (
            <Container
              header="Interview Details"
              children={<InterviewCard id={stageId} />}
            />
          )}
{/* <CalendarBooking stageId={stageId}  /> */}

         
          </>
        }
      />
    </div>
  );
}

export default InterviewStage;
