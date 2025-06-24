import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import StageLayout from "../../components/applicant/dashboard/Stages/StageLayout";
import Container from "../../components/applicant/dashboard/general/Container";
import GetAppTask from "@/components/applicant/dashboard/Stages/Task/GetAppTask";
import SubmitURL from "@/components/applicant/dashboard/Stages/Task/SubmitURL";
import StatusContainer from "@/components/applicant/dashboard/Stages/Task/StatusContainer";
import SubmissionView from "@/components/applicant/dashboard/Stages/Task/SubmissionView";
import useGetStage from "@/hooks/applicant/progress/useGetStage";
import ErrorPage from "../general/ErrorPage";
import LoadingStage from "./LoadingStage";

function TaskStage() {
  const { stageProgressId } = useParams();
    const [stageData, setStageData] = useState([]);
  


const {
  data,
  isLoading,
  isSuccess,
  error,
  isError,
} = useGetStage({ stageProgressId });

    useEffect(() => {
      if (isSuccess) {
        setStageData(data);
        console.log("Stage Data updated:", data);
      }
    }, [isSuccess, data]);
// ضع هذا في الكومبوننت
console.log('🔍 Debug Info:', {
  stageProgressId,
  isLoading,
  isError,
  error: error?.message,
  data: stageData,
});

  const stage = stageData?.actionStatus || "";
  const additionalData = stageData?.additionalData || {};

  const statusColors = useMemo(() => ({
    TaskSubmitted: { bg: "bg-purple-100", text: "text-purple-600" },
    TaskAccepted: { bg: "bg-green-100", text: "text-green-600" },
    TaskRejected: { bg: "bg-red-100", text: "text-red-600" },
    Reviewed: { bg: "bg-blue-100", text: "text-blue-600" },
    Failed: { bg: "bg-red-100", text: "text-red-600" },
    Completed: { bg: "bg-green-100", text: "text-green-600" },
    TaskAssigned: { bg: "bg-gray-100", text: "text-gray-600" },
    TaskNotAssigned: { bg: "bg-yellow-100", text: "text-yellow-600" },
  }), []);


  // Task Content - يمكن نقلها لملف utils منفصل
  const getTaskContent = useMemo(() => (stage) => {
    const contentMap = {
      TaskSubmitted: {
        description: "Task submitted, under review.",
        message: "Your submission is being reviewed. Check back later.",
      },
      TaskAccepted: {
        description: "Task accepted.",
        message: "Your task has been accepted. No further action needed.",
      },
      TaskRejected: {
        description: "Task rejected, You need resubmission.",
        message: "Your task was rejected. Review feedback and resubmit if needed.",
      },
      Reviewed: {
        description: "Feedback is available.",
        message: "Feedback is ready. Check your task details for comments.",
      },
      Failed: {
        description: "Stage failed.",
        message: "Your task failed. Review feedback and consider resubmission.",
      },
      Completed: {
        description: "Stage completed successfully.",
        message: "Congratulations! Your task is successfully completed.",
      },
    };
    return contentMap[stage] || null;
  }, []);

  // Computed values
  const isNotAssigned = stage === "TaskNotAssigned" || stage === "Failed";
  const color = statusColors[stage] || statusColors["TaskAssigned"];
  const taskContent = getTaskContent(stage);


  // Debugging - يمكن إزالتها في الإنتاج
  useEffect(() => {
    
      console.log("Stage Progress ID:", stageProgressId);
      console.log("API data:", stageData);
      console.log("Current stage:", stage);
      console.log("Is loading:", isLoading);
      console.log("Error:", error);
    
  }, [stageProgressId, stageData, stage, isLoading, error]);

  // Error handling
  if (error) {
    return (
      <StageLayout
        header="Task Stage"
        Children={
          <Container
            header="Error"
            children={
               <ErrorPage error={error.errorDetails} />
            }
          />
        }
      />
    );
  }
if(isLoading){
  <LoadingStage />
}


  // No data state
  if (!stageData || !stage) {
    return (
      <StageLayout
        header="Task Stage"
        Children={
          <Container
            header="No Data"
            children={
              <div className="flex flex-col items-center justify-center py-10 bg-gray-50 rounded-lg ">
  <p className="text-gray-500 text-lg font-medium">📭 No stage data available</p>
</div>

            }
          />
        }
      />
    );
  }

  // Render conditions - تحسين الشروط
  const shouldShowTaskDetails = ["TaskAssigned", "TaskNotAssigned","TaskRejected"].includes(stage);
  const shouldShowSubmitWork = ["TaskAssigned", "TaskNotAssigned", "TaskRejected"].includes(stage);
  const shouldShowSubmission = ["TaskSubmitted", "Reviewed", "Failed", "Completed", "TaskRejected"].includes(stage);
  const shouldShowFeedback = ["Reviewed", "Completed", "Failed", "TaskRejected"].includes(stage) && additionalData.feedbackId;

  return (
    <StageLayout
      header="Task Stage"
      feedbackId={shouldShowFeedback ? additionalData.feedbackId : null}
    stagePassingScore={additionalData.stagePassingScore}

      Children={
        <>

          {taskContent && (
            <StatusContainer 
              stage={stage} 
              color={color} 
              message={taskContent.message} 
            />
          )}

          {shouldShowTaskDetails && (
            <Container
              header="Task Details"
              children={
                <GetAppTask
                  taskId={additionalData.taskId}
                  dueDate={additionalData.dueDate}
                  stageProgressId={stageData.id}
                  bool={isNotAssigned}
                />
              }
            />
          )}

          {shouldShowSubmitWork && (
            <Container
              header="Submit Your Work"
              children={
                <SubmitURL 
                  AppTaskId={additionalData.taskApplicantId } 
                />
              }
            />
          )}

        

          {shouldShowSubmission && (
            <Container
              header="Your Submission"
              children={
                <SubmissionView 
                  submissionDate={additionalData.submissionDate}
                  submissionUrl={additionalData.submissionUrl}
                  submissionId={additionalData.submissionId}
                />
              }
            />
          )}
        </>
      }
    />
  );
}

export default TaskStage;