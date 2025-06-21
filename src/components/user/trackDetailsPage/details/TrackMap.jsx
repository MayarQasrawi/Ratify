import React, { useState } from "react";
import Title from "../shared/Title";

export default function LearningJourneyMap({ plan }) {
  const [activeLevel, setActiveLevel] = useState(null);
  const [activeStage, setActiveStage] = useState(null);

  const handleLevelClick = (level) => {
    console.log(level)
    setActiveLevel(level.id === activeLevel?.id ? null : level);
    setActiveStage(null);
  };

  const handleStageClick = (stage) => {
    setActiveStage(stage.id === activeStage?.id ? null : stage);
  };

 

  return (
    <div className="mt-12 w-full max-w-6xl mx-auto px-4">
      <div className="flex items-center gap-3 mb-10">
        <Title>Evaluation Adventure</Title>
        <div className=" sm:w-[50%] lg:w-[70%]  border-t-2 border-[var(--main-color)]"></div>
      </div>
      <div className=" p-6 mb-8">
        <div className="relative flex items-center justify-between min-h-48 overflow-x-auto scrollbar-custom pb-2">
          <div className=" mx-4 min-w-max">
            <div className="w-22 h-22 rounded-full bg-green-400 flex items-center justify-center shadow-md">
              <span className="text-white text-3xl">&#128640;</span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <svg width="60" height="24" viewBox="0 0 60 24">
              <line
                x1="0"
                y1="12"
                x2="52"
                y2="12"
                stroke="#22c55e"
                strokeWidth="4"
              />
              <polygon points="52,4 60,12 52,20" fill="#22c55e" />
            </svg>
          </div>
          {plan.map((level, index) => (
            <React.Fragment key={level.id}>
              <div className="flex flex-col items-center mx-2 min-w-max">
                <div
                  onClick={() => handleLevelClick(level)}
                  className={`
                    relative w-28 h-28 rounded-full flex flex-col items-center justify-center cursor-pointer
                    shadow-lg transition-all duration-300
                    ${
                      activeLevel?.id === level.id
                        ? "bg-[var(--main-color)] text-white border-2 border-white"
                        : "bg-white text-[var(--main-color)] border-2 border-blue-100"
                    }
                  `}
                >
                  <div
                    className={`
                      absolute -top-2 -right-2 w-8 h-8 rounded-full 
                      flex items-center justify-center
                      ${
                        activeLevel?.id === level.id
                          ? "bg-white text-[var(--main-color)]"
                          : "bg-[var(--main-color)] text-white"
                      }
                      font-bold text-sm shadow-md
                    `}
                  >
                    {index + 1}
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-sm">{level.name}</div>
                    <div className="text-[10px] mt-1">
                      {level.stages.length} stages
                    </div>
                  </div>
                </div>
              </div>
              {index <= plan.length - 1 && (
                <div className="flex-shrink-0">
                  <svg width="80" height="24" viewBox="0 0 80 24">
                    <line
                      x1="0"
                      y1="12"
                      x2="72"
                      y2="12"
                      stroke="#3b82f6"
                      strokeWidth="4"
                    />
                    <polygon points="72,4 80,12 72,20" fill="#3b82f6" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
          <div className="flex flex-col items-center mx-4 min-w-max">
            <div className="w-22 h-22  rounded-full bg-amber-400 flex flex-col items-center justify-center shadow-lg">
              <span className="text-white text-3xl">&#127942;</span>
            </div>
          </div>
        </div>
      </div>
      {activeLevel && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-6">
            <h2 className="text-xl font-bold text-[var(--main-color)]">
              {activeLevel.name} - Journey Stages
            </h2>
            <div className="ml-3 bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
              {activeLevel.stages.length || 0} Stages
            </div>
          </div>

          <div className="relative overflow-x-auto pb-12">
            <div className="flex items-center min-w-max">
              {activeLevel.stages.map((stage, idx, stages) => (
                <React.Fragment key={stage.id}>
                  <div className="flex flex-col items-center">
                    <div
                      onClick={() => handleStageClick(stage)}
                      className={`
                          w-16 h-16 rounded-full flex flex-col items-center justify-center cursor-pointer
                          ${
                            activeStage?.id === stage.id
                              ? "bg-blue-400 text-white"
                              : "bg-white text-blue-400 border-2 border-blue-100"
                          }
                          shadow-md
                        `}
                    >
                      <span className="font-bold">{idx + 1}</span>
                      <span className="text-xs">{stage.type}</span>
                    </div>
                    <span
                      className={`text-xs mt-2 font-medium ${
                        activeStage?.id === stage.id
                          ? "text-blue-700"
                          : "text-gray-600"
                      }`}
                    >
                      {stage.type}
                    </span>
                  </div>

                  {idx < stages.length - 1 && (
                    <div className="mx-3">
                      <svg width="40" height="16" viewBox="0 0 40 16">
                        <line
                          x1="0"
                          y1="8"
                          x2="32"
                          y2="8"
                          stroke="#3b82f6"
                          strokeWidth="2"
                        />
                        <polygon points="32,3 40,8 32,13" fill="#3b82f6" />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          {activeStage && (
            <div className="mt-4 bg-blue-50 rounded-lg border border-blue-200 p-6">
              <div className="flex items-center">
                <h3 className="font-bold text-xl text-blue-600">
                  {activeStage.type}
                </h3>
                <div className="ml-auto bg-blue-100 text-blue-700 px-3 py-1 text-sm font-medium rounded-full">
                  Stage{" "}
                  {activeStage.order}
                </div>
              </div>
              <p className="text-gray-700 my-3">{activeStage.description}</p>

              <div className="flex items-center mt-4 flex-wrap gap-2">
                <div className="bg-gradient-to-r from-blue-400 to-blue-700 text-white rounded-full py-1 px-4 text-sm font-medium shadow-sm">
                  Passing Score: {activeStage.passingScore}%
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
