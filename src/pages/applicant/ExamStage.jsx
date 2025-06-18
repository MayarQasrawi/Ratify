import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import StageLayout from "../../components/applicant/dashboard/Stages/StageLayout";
import Container from "../../components/applicant/dashboard/general/Container";
import ExamCard from "../../components/applicant/dashboard/Stages/Exam/ExamCard";
import CustomModal from "../../components/applicant/dashboard/Stages/Exam/CustomModal";
import Toast from "../../components/applicant/dashboard/Stages/Exam/Toast";
import useExamRequest from "../../hooks/applicant/Exam/useExamRequest";
import ExamRequestCard from "../../components/applicant/dashboard/Stages/Exam/ExamRequestCard";
import useGetStage from "../../hooks/applicant/progress/useGetStage";
import { useAuthContext } from "@/contexts/AuthProvider";
import Extract from "@/utils/Extract";
import { StatusDisplay } from "../../components/applicant/dashboard/Stages/Task/StatusContainer";

// زر الإجراءات
const ActionButton = ({ text, onClick }) => (
  <button
    className="bg-[var(--main-color)] text-white px-16 cursor-pointer hover:bg-[var(--secondary-color)] py-2 rounded-lg"
    onClick={onClick}
  >
    {text}
  </button>
);

function ExamStage() {
  // const [isLoading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [toasts, setToasts] = useState([]);

  const { state } = useLocation();
  const [stageData, setStageData] = useState(state?.stage);

  const {
    data,
    isLoading: isStageLoading,
    refetch: refetchStage,
  } = useGetStage({ stageId: stageData?.id, status: stageData?.actionStatus });

  console.log("ExamStage data:", data);
  console.log("ExamStage isLoading:", refetchStage);

  const statusColors = {
    ReadyToRequest: { bg: "bg-gray-100", text: "text-gray-600" },
    RequestPending: { bg: "bg-purple-100", text: "text-purple-600" },
    RequestApproved: { bg: "bg-green-100", text: "text-green-600" },
    RequestRejected: { bg: "bg-red-100", text: "text-red-600" },
    ExamCompleted: { bg: "bg-blue-100", text: "text-blue-600" },
    FeedbackAvailable: { bg: "bg-yellow-100", text: "text-yellow-600" },
  };
  const color =
    statusColors[stageData?.actionStatus] || statusColors["ReadyToRequest"];
  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleExamRequest = () => {
    setIsModalOpen(true);
  };

  const { auth } = useAuthContext();
  const id = Extract(auth, "nameid");

  const { mutate: requestExam, isLoading } = useExamRequest();
  // فوق الكومبوننت مباشرة

  const confirmExamRequest = () => {
    setIsLoadingModal(true);

    const payload = {
      stageId: stageData?.stageId,
      applicantId: id,
    };

    requestExam(payload, {
      onSuccess: async (examRequestId) => {
        addToast("Exam request submitted successfully!", "success");
        setIsModalOpen(false);
        const refreshed = await refetchStage();
        setStageData(refreshed);
      },

      onError: (error) => {
        addToast("Failed to submit exam request", "error");
        console.error(error);
      },
      onSettled: () => {
        setIsLoadingModal(false);
      },
    });
  };

  const getExamRequestContent = (stage) => {
    const baseConfig = {
      header: "Exam Request",
      description: "",
      showButton: false,
      buttonText: "",
      buttonAction: null,
      statusMessage: "",
    };

    switch (stage) {
      case "ReadyToRequest":
        return {
          ...baseConfig,
          description:
            "No exam request exists. Submit your request to take the exam. Our team will review and schedule it for you.",
          showButton: true,
          buttonText: "Request Now",
          statusMessage: "Check your email for scheduling details.",
        };
      case "RequestPending":
        return {
          ...baseConfig,
          description: "Exam request is pending. Please wait for confirmation.",
          statusMessage: "Check your email for scheduling details.",
        };
      case "RequestApproved":
        return {
          ...baseConfig,
          description: "Exam request approved, ready to take exam.",
          statusMessage: "Check your email for exam details and instructions.",
        };
      case "RequestRejected":
        return {
          ...baseConfig,
          description: "Request rejected, can request new attempt.",
          showButton: true,
          buttonText: "Request New Attempt",
          statusMessage: "Contact support for more details.",
        };
      case "ExamCompleted":
        return {
          ...baseConfig,
          description: "Exam taken, waiting for results.",
          statusMessage: "Results will be available soon.",
        };
      default:
        return {
          ...baseConfig,
          description:
            "No exam request exists. Submit your request to take the exam.",
          showButton: true,
          buttonText: "Request Now",
          statusMessage: "Check your email for scheduling details.",
        };
    }
  };

  const {
    header,
    description,
    showButton,
    buttonText,
    buttonAction,
    statusMessage,
  } = getExamRequestContent(stageData?.actionStatus || "ReadyToRequest");

  // if (!isLoading) {
  //   return (
  //     <main className="flex flex-col items-center justify-center p-2 animate-pulse">
  //       <div className="bg-blue-500/10 w-[96%] mx-4 my-2 rounded-lg py-5 mt-8">
  //         <div className="h-8 bg-blue-300/30 w-2/3 mx-auto rounded" />
  //       </div>
  //       <section className="w-full flex flex-col items-center gap-4 mt-4">
  //         <div className="bg-gray-200 h-32 w-[90%] rounded-lg" />
  //         <div className="bg-gray-200 h-24 w-[90%] rounded-lg" />
  //       </section>
  //       <div className="w-[90%] mt-10 p-4 bg-gray-200 rounded-lg">
  //         <div className="h-5 bg-gray-300 w-1/3 mb-3 rounded"></div>
  //         <div className="h-4 bg-gray-300 w-full rounded"></div>
  //       </div>
  //     </main>
  //   );
  // }

  return (
    <div>
      <StageLayout
        feedbackId={
          ["FeedbackAvailable", "Completed", "Failed", "Reviewed"].includes(
            stageData?.actionStatus
          )
            ? stageData?.additionalData?.FeedbackId
            : null
        }
        header="Exam"
        Children={
          <>
            {!["FeedbackAvailable", "Completed", "Failed", "Reviewed"].includes(
              stageData?.actionStatus
            ) && (
              <Container
                header={header}
                descriptions={description}
                children={
                  <div className="flex flex-col gap-8 mt-4 items-center justify-center">
                    {showButton && (
                      <ActionButton
                        text={buttonText}
                        onClick={handleExamRequest}
                      />
                    )}
                    <StatusDisplay
                      status={stageData?.actionStatus}
                      color={color}
                      message={statusMessage}
                    />
                  </div>
                }
              />
            )}

            {[
              "RequestApproved",
              "RequestRejected",
              "RequestPending",
              "ReadyToRequest",
            ].includes(stageData?.actionStatus) && (
              <Container
                header="Exam Details"
                descriptions="Here you'll find information about the exam format and guidelines."
                children={<ExamCard stageId={stageData?.stageId} />}
              />
            )}

            {["Completed", "Failed", "Reviewed", "FeedbackAvailable"].includes(
              stageData?.actionStatus
            ) && (
              <Container
                header="Exam Status"
                children={
                  <div className="flex justify-center">
                    <StatusDisplay
                      status={stageData?.actionStatus}
                      color={color}
                      message={`This is your final exam status`}
                    />
                  </div>
                }
              />
            )}

            {["RequestApproved"].includes(stageData?.actionStatus) && (
              <Container
                header="Exam Request"
                descriptions="Here you'll find your exam request details."
                children={
                  <ExamRequestCard
                    requestId={stageData?.additionalData?.examRequestId}
                  />
                }
              />
            )}
          </>
        }
      />

      {/* Modal */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => !isLoadingModal && setIsModalOpen(false)}
        onConfirm={confirmExamRequest}
        isLoading={isLoadingModal}
      />

      {/* Toasts */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </div>
    </div>
  );
}

export default ExamStage;
