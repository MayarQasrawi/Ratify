import React, { useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuizQuestion from "@/components/ai/qizz/QuizQuestion";
import QuizNavigation from "@/components/ai/qizz/QuizNavigation";
import ResultsTable from "@/components/ai/qizz/ResultsTable";
import ResultSummary from "@/components/ai/qizz/ResultSummary";
import Back from "@/components/shared/dashboard/Back";
const ANSWER_QUESTION = "ANSWER_QUESTION";
const NEXT_QUESTION = "NEXT_QUESTION";
const COMPLETE_QUIZ = "COMPLETE_QUIZ";
const Generate_QUIZ = "Generate_QUIZ";

function quizReducer(state, action) {
  switch (action.type) {
    case ANSWER_QUESTION:
      return {
        ...state,
        userAnswers: [
          ...state.userAnswers.slice(0, action.questionIndex),
          action.optionIndex,
          ...state.userAnswers.slice(action.questionIndex + 1),
        ],
      };
    case NEXT_QUESTION:
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
      };
    case COMPLETE_QUIZ:
      return {
        ...state,
        quizCompleted: true,
      };
    case Generate_QUIZ:
      return {
        ...state,
        currentQuestion: 0,
        userAnswers: Array(state.quizData.length).fill(null),
        quizCompleted: false,
        quizData: action.question,
      };
    default:
      return state;
  }
}
export default function Quiz() {
  const location = useLocation();
  console.log(location?.state?.topic);
  const initialState = {
    quizData: location?.state?.quizz,
    currentQuestion: 0,
    userAnswers: Array(location?.state?.number).fill(null),
    quizCompleted: false,
  };
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { quizData, currentQuestion, userAnswers, quizCompleted } = state;

  console.log(quizData[currentQuestion], "inside reducer");
  const handleAnswerSelect = (optionIndex) => {
    dispatch({
      type: ANSWER_QUESTION,
      questionIndex: currentQuestion,
      optionIndex,
    });
  };

  if (quizCompleted) {
    return (
      <div className="w-[90%] mx-auto flex flex-col  gap-8 py-6  min-h-screen items-start">
        <div className="bg-blue-100 font-mono  rounded-md w-full p-4 text-center">
          <h2 className="text-blue-500 text-3xl font-bold">Summary</h2>
        </div>
        <ResultSummary
          quizData={quizData}
          userAnswers={userAnswers}
          dispatch={dispatch}
        />{" "}
        <ResultsTable quizData={quizData} userAnswers={userAnswers} />
      </div>
    );
  }
  return (
    <>
    <div className="w-[80%] mx-auto flex flex-col justify-center h-screen">
      <QuizQuestion
        topic={location?.state?.topic}
        questionNumber={currentQuestion + 1}
        totalQuestions={quizData.length}
        currentQuestion={quizData[currentQuestion]}
        onAnswerSelect={handleAnswerSelect}
        selectedAnswer={userAnswers[currentQuestion]}
      />
      <QuizNavigation
        onNext={() => {
          if (currentQuestion < quizData.length - 1) {
            dispatch({ type: NEXT_QUESTION });
          } else {
            dispatch({ type: COMPLETE_QUIZ });
          }
        }}
        isLastQuestion={currentQuestion === quizData.length - 1}
        isAnswered={userAnswers[currentQuestion] !== null}
      />
    </div>
    </>
  );
}
