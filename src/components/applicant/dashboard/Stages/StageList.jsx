// src/components/applicant/dashboard/StageList.jsx
import React, { useEffect, useState } from "react";
import useGetStageProgress from "@/hooks/applicant/progress/useGetStageProgress";
import StageCard from "./StageCard";

const StageList = ({ levelProgressId, onStageClick }) => {
  const { data, isLoading, isError } = useGetStageProgress({
    levelProgressId,
  });

const mockStages = [
  {
    id: 1,
    levelProgressId: 1,
    stageId: 1,
    stageName: "Initial Technical Interview",
    stageType: "interview",
    status: "InProgress",
    score: 0,
    examinerId: "5ab3f6b3-9d6e-4653-8702-06f8fa7a97ea",
    startDate: "2025-05-14T23:23:31.5220971",
    completionDate: "0001-01-01T00:00:00",
    attempts: 1,
    actionStatus: "ReadyToBook",
    additionalData: {
      interviewBookId: 1,
      scheduledDate: null,
      meetingLink: "h----",
      FeedbackId: "2",
    }
  },
  {
    id: 2,
    levelProgressId: 1,
    stageId: 2,
    stageName: "Coding Assessment",
    stageType: "task",
    status: "TaskAssigned",
    score: 85,
    examinerId: "7cd4f7c4-8e7f-5764-9803-17g9gb8b98fb",
    startDate: "2025-05-15T10:00:00.0000000",
    completionDate: "2025-05-15T11:30:00.0000000",
    attempts: 1,
    actionStatus: "TaskAssigned",
    additionalData: {
      interviewBookId: 2,
      scheduledDate: "2025-05-15T10:00:00.0000000",
      meetingLink: null,
      FeedbackId: "3",
    }
  },
  {
    id: 3,
    levelProgressId: 2,
    stageId: 3,
    stageName: "Behavioral Interview",
    stageType: "interview",
    status: "Scheduled",
    score: 0,
    examinerId: "9ef5g8d5-0f8g-6875-0914-28h0hc9c09gc",
    startDate: "2025-05-20T14:00:00.0000000",
    completionDate: "0001-01-01T00:00:00",
    attempts: 0,
    actionStatus: "Completed",
    additionalData: {
      interviewBookId: 3,
      scheduledDate: "2025-05-20T14:00:00.0000000",
      meetingLink: "i----",
      FeedbackId: null,
    }
  },
  {
    id: 4,
    levelProgressId: 2,
    stageId: 4,
    stageName: "Final Technical Exam",
    stageType: "exam",
    status: "NotStarted",
    score: 0,
    examinerId: "1ab2c3d4-5e6f-7890-1234-56i7j8k9l0mn",
    startDate: "0001-01-01T00:00:00",
    completionDate: "0001-01-01T00:00:00",
    attempts: 0,
    actionStatus: "RequestApproved",
    additionalData: {
      interviewBookId: 4,
      scheduledDate: null,
      meetingLink: null,
      FeedbackId: null,
    }
  }
];

  const [stages, setStages] = useState([]);

useEffect(() => {
    if (data && !isLoading && !isError) {
      console.log("Fetched stages:", data.data);
      console.log("applicant ID:", data.data.applicantId);
      setStages(data.data);
    } else if (isError) {
      // استخدم الموك داتا إذا في مشكلة بال API
      setStages(mockStages);
    }
  }, [data, isLoading, isError]);


     // Skeleton loading component
   if (isLoading) {
    return (
      <div className="bg-white p-4 overflow-hidden transition-all duration-200">
        <div className="flex items-start">
          <div className="p-2 rounded-lg">
            <div className="bg-gray-200 h-8 w-8 rounded-lg animate-pulse"></div>
          </div>
          
          <div className="ml-4 flex-grow">
            <div className="flex justify-between items-center">
              <div className="bg-gray-200 h-5 w-32 rounded animate-pulse"></div>
              <div className="bg-gray-200 h-6 w-20 rounded-full animate-pulse"></div>
            </div>
            
            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <div className="bg-gray-200 h-4 w-12 rounded animate-pulse"></div>
                  <div className="bg-gray-200 h-4 w-24 rounded animate-pulse"></div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                  <div className="bg-gray-200 h-2 w-1/2 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mt-3">
                <div className="flex items-center">
                  <div className="bg-gray-200 h-4 w-4 mr-1 rounded animate-pulse"></div>
                  <div className="bg-gray-200 h-4 w-32 rounded animate-pulse"></div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-gray-200 h-4 w-4 mr-1 rounded animate-pulse"></div>
                  <div className="bg-gray-200 h-4 w-40 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // if (isError) {
  //   return (
  //     <p className="text-center text-red-500 p-4">
  //       Failed to load stages. Using mock data.
  //     </p>
  //   );
  // }

  if (stages.length === 0) {
    return (
      <p className="text-center text-gray-500 p-4">
        No stages available for this level.
      </p>
    );
  }

  return (
    <div className="divide-y-2 divide-[var(--table-border)]">
      {stages.map((stage) => (

          
        <StageCard
          key={stage.id}
          stage={stage}
          onClick={onStageClick}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default StageList;
