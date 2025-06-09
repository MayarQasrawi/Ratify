import React from "react";
import StageLayout from "../../components/applicant/dashboard/Stages/StageLayout";
import Container from "../../components/applicant/dashboard/general/Container";
import { useLocation } from "react-router-dom";
import GetAppTask from "@/components/applicant/dashboard/Stages/Task/GetAppTask";
import SubmitURL from "@/components/applicant/dashboard/Stages/Task/SubmitURL";
import { useState, useEffect } from "react";

const StatusDisplay = ({ status, color, message }) => (
  <div className="flex items-center justify-center">
      <div className="border-2 border-gray-200 rounded-xl p-6 max-w-sm flex flex-col items-center ">
    <div className="flex items-center justify-around gap-3 mb-1">
      <span className="text-sm font-bold text-gray-700">Status</span>
      <span
        className={`text-sm font-semibold px-8 py-1 rounded-md ${color.bg} ${color.text}`}
      >
        {status}
      </span>
    </div>
    <p className="text-xs mt-4 text-gray-500">{message}</p>
  </div>
  </div>

);

const ActionButton = ({ text, onClick }) => (
  <button
    className="bg-[var(--main-color)] text-white px-14 cursor-pointer hover:bg-[var(--secondary-color)] py-2 rounded-lg"
    onClick={onClick}
  >
    {text}
  </button>
);

const StatusContainer = ({ stage, color, message }) => (
  <Container header="Status">
    <StatusDisplay status={stage} color={color} message={message} />
  </Container>
);

function TaskStage() {
  const { state } = useLocation();
  const stageData = state?.stage || {};
  
  const stage = state?.stage?.actionStatus;
  const stageProgressId = stageData?.id || null;

  

  const statusColors = {
    TaskSubmitted: { bg: "bg-purple-100", text: "text-purple-600" },
    TaskAccepted: { bg: "bg-green-100", text: "text-green-600" },
    TaskRejected: { bg: "bg-red-100", text: "text-red-600" },
    Reviewed: { bg: "bg-blue-100", text: "text-blue-600" },
    Failed: { bg: "bg-red-100", text: "text-red-600" },
    Completed: { bg: "bg-green-100", text: "text-green-600" },
    TaskAssigned: { bg: "bg-gray-100", text: "text-gray-600" }, // إضافة لون افتراضي للحالة الافتراضية
  };
 const isNotAssigned = stage==="TaskNotAssigned" || stage=="Failed"
  const color = statusColors[stage] || statusColors["TaskAssigned"];

  const getTaskContent = (stage) => {
    switch (stage) {
      case "TaskSubmitted":
        return {
          description: "Task submitted, under review.",
          message: "Your submission is being reviewed. Check back later.",
        };
      case "TaskAccepted":
        return {
          description: "Task accepted.",
          message: "Your task has been accepted. No further action needed.",
        };
      case "TaskRejected":
        return {
          description: "Task rejected, You need resubmission.",
          message: "Your task was rejected. Review feedback and resubmit if needed.",
        };
      case "Reviewed":
        return {
          description: "Feedback is available.",
          message: "Feedback is ready. Check your task details for comments.",
        };
      case "Failed":
        return {
          description: "Stage failed.",
          message: "Your task failed. Review feedback and consider resubmission.",
        };
      case "Completed":
        return {
          description: "Stage completed successfully.",
          message: "Congratulations! Your task is successfully completed.",
        };
      default:
        return null;
    }
  };

  const taskContent = getTaskContent(stage);
  const [AppTaskId, setAppTaskId] = useState(null);

  useEffect(() => {
    const savedTaskId = localStorage.getItem("AppTaskId");
    if (savedTaskId) {
      setAppTaskId(savedTaskId);
    }
  }, []);

  return (
    <StageLayout
      header="Task Stage"
     
      feedbackId={
        (["Reviewed", "Completed", "Failed","TaskRejected"].includes(stage) && stageData?.additionalData?.feedbackId )
          ? stageData?.additionalData?.feedbackId 
          : null
      }
      Children={
        <>
          {["TaskAssigned", "TaskNotAssigned"].includes(stage) && (
            <Container
              header="Task Details"
              children={
                <GetAppTask
                  taskId={stageData?.additionalData?.taskId}
                  dueDate={stageData?.additionalData?.dueDate}
                  stageProgressId={stageData?.id}
                  bool={isNotAssigned}
                />
              }
            />
          )}

          {["TaskAssigned", "TaskNotAssigned","TaskRejected"].includes(stage) && (
            <Container
              header="Submit Your Work"
              children={<SubmitURL AppTaskId={stageData?.additionalData?.taskApplicantId || AppTaskId} />}
            />
          )}

          {taskContent && (
            <StatusContainer stage={stage} color={color} message={taskContent.message} />
          )}
        </>
      }
    />
  );
}

export default TaskStage;
