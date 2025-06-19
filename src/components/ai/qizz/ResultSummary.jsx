import React, { useState } from "react";
import { FaTrophy } from "react-icons/fa";

import QuizModel from "./QuizzModel";
import { useNavigate } from "react-router-dom";
import Back from "@/components/shared/dashboard/Back";

export default function ResultSummary({ quizData, userAnswers, dispatch }) {
  const [showModel, setshowModel] = useState(false);
  const navigate=useNavigate()
  let correctCount = 0;
  quizData.forEach((q, i) => {
    if (userAnswers[i] === q.answerIndex) correctCount++;
  });
  const passed = correctCount >= Math.ceil(quizData.length / 2);
  const message = passed ? "You Passed!" : "You Failed";
  const textColor = passed ? "text-green-600" : "text-red-600";
  const iconColor = passed ? "text-yellow-500" : "text-gray-300";
  return (
    <>
    <div className="p-5">
         {/* <Back  text="Back To Topic"
                onClick={() => {
                  navigate('/applicant/ai-courseOutline');
                }} /> */}
                </div>
      {showModel && (
        <div className="flex justify-center items-center h-screen fixed top-0 z-20 w-full ">
          <QuizModel
            setModel={setshowModel}
            quiz={true}
            dispatch={dispatch}
            type='quiz'
          />
        </div>
      )}
      <div className="w-full  bg-white border border-gray-200 rounded-2xl shadow-xl p-6 flex flex-col items-center mt-4">
        <h2 className="text-2xl font-semibold text-[#3B82F6] mb-4 font-mono">Results</h2>
        <FaTrophy className={`w-12 h-12 mb-2 ${iconColor}`} />
        <p className={`text-lg font-bold ${textColor} mb-1`}>{message}</p>
        <p className="text-sm text-gray-500">
         <span className="font-bold"> {correctCount}</span> / {quizData.length} correct
        </p>
        <button
          className="mt-3 cursor-pointer py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg flex items-center justify-center transition-colors shadow-md"
          onClick={() => setshowModel(true)}
        >
          Generate Quiz with AI
        </button>
      </div>
    </>
  );
}
