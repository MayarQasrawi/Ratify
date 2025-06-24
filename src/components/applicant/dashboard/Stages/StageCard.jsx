import React from "react";
import StageIcon from "./StageIcon";
import StatusBadge from "./StatusBadge";
import { useLocation, useNavigate } from "react-router";

const StageCard = ({ stage, onClick, isLoading = true, allStages }) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("StageCard", location);

  const handleClick = () => {
    switch (stage.stageType.toLowerCase()) {
      case "interview":
        navigate(`/applicant/interview/${stage.stageId}`, {
          state: { stage, allStages,trackId:location.state.trackId },
        });
        break;

      case "task":
        navigate(`/applicant/task/${stage.id}`, {
          state: { stage, allStages,trackId:location.state.trackId },
        }); //التاسك باحتاج مفتاح البروغرسس مش الستيج نفسه مشان  أوصله
        break;
      case "exam":
        navigate(`/applicant/exam/${stage.stageId}`, {
          state: { stage, allStages ,trackId:location.state.trackId},
        });
        break;
      default:
        console.warn("Unknown stage type:", stage.stageType);
    }
  };

<<<<<<< HEAD
 const handleClick = () => {
  switch (stage.stageType.toLowerCase()) {
    case "interview":
      navigate(`/applicant/interview/${stage.id}`, { state: { stage , allStages } });
      break;
      
    case "task":
      navigate(`/applicant/task/${stage.id}`, { state: { stage , allStages } });  //التاسك باحتاج مفتاح البروغرسس مش الستيج نفسه مشان  أوصله
      break;
    case "exam":
      navigate(`/applicant/exam/${stage.id}`, { state: { stage , allStages } });
      break;
    default:
      console.warn("Unknown stage type:", stage.stageType);
  }
};

  
=======
>>>>>>> a333b403dd5f8f90af4276665c0c4606c2ea2bab
  const progressPercent =
    stage.score !== undefined ? (stage.score / 100) * 100 : 0;

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      className={`bg-white p-4  border-2 border-[var(--table-border)] m-2 h-[128px] overflow-hidden transition-all duration-300 ease-in-out
      hover:shadow-xl hover:scale-102 hover:bg-purple-50 cursor-pointer rounded-lg`}
      onClick={handleClick}
    >
      <div className="flex items-start">
        <div className=" p-2 rounded-lg">
          <StageIcon type={stage.stageType} />
        </div>

        <div className="ml-4 flex-grow">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">{stage.stageName}</h3>
            <StatusBadge status={stage.status} />
          </div>

          <div className="mt-4 space-y-3">
            {stage.score !== undefined && (
              <div>
                {console.log("stage actionStatus:", stage.actionStatus)}

                {stage.actionStatus === "Completed" ||
                stage.actionStatus === "Reviewed" ||
                stage.actionStatus === "Failed" ||
                stage.actionStatus === "Successful" ? (
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="text-gray-600">Score</span>
                    <span className="font-medium">
                      {stage.score}/100 points
                    </span>
                  </div>
                ) : null}
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-blue-500
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
              {stage.startDate && (
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Due: {formatDate(stage.startDate)}</span>
                </div>
              )}

              {stage.completionDate !== "0001-01-01T00:00:00" && (
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Scheduled: {formatDate(stage.completionDate)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageCard;
