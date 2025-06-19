import { useState } from "react";
import { FaRobot, FaRegLightbulb } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { generateFlashcards, generateQuiz } from "../../../aiModule/AIModal";
import Spinner from "@/components/shared/Spinner";
import Modal from "@/components/shared/modal/Modal";
export default function QuizModel({ setModel, type, quiz = false, dispatch }) {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(
    location?.state?.material?.chapters.map((ch) => ch.title),
    "inside quizz model"
  );
  const [config, setQuizConfig] = useState({
    numQuestions: 5,
    useTimer: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleConfigChange = (field, value) => {
    setQuizConfig({
      ...config,
      [field]: value,
    });
  };
  const handleSubmit = async () => {
    if (type == "quiz") {
      console.log("Quiz Configuration:", config);
      setIsLoading(true);
      const response = await generateQuiz(
        location?.state?.material?.chapters.map((ch) => ch.title),
        config.numQuestions
      );
      if (response != null && !quiz) {
        console.log(response, "quiz");
        navigate("/applicant/ai-quiz", {
          state: {
            quizz: response.quiz,
            number: config.numQuestions,
            material: location?.state?.material,
            topic: location?.state?.topic,
          },
        });
      }
      if (response != null && quiz) {
        dispatch({ type: "Generate_QUIZ", question: response.quiz });
      }
      setIsLoading(false);
    }
    if (type == "flashcard") {
      console.log(
        "inside flashcard model",
        location?.state?.topic,
        config.numQuestions,
        location?.state?.level
      );
      setIsLoading(true);
      const response = await generateFlashcards(
        location?.state?.topic,
        config.numQuestions,
        location?.state?.level
      );
      if (response != null) {
        console.log(response, "flash card");
        setIsLoading(false);
        navigate("/applicant/ai-card", {
          state: {
            flashcards: response.flashcards,
            number: config.numQuestions,
            topic: location?.state?.topic,
          },
        });
      }
    }
  };

  return (
    <Modal>
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-lg p-8 pt-5 max-w-md mx-auto border border-blue-100 w-1/2 min-h-[380px]">
        <div
          className="flex justify-end text-2xl "
          onClick={() => {
            setModel(null);
          }}
        >
          <MdClose className="hover:text-red-500 cursor-pointer" />
        </div>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-[var(--main-color)] capitalize">
            AI-Generated {type}
          </h2>
          <p className="text-gray-600 text-sm mt-1 flex items-center justify-center">
            <FaRobot className="mr-1" /> Powered by artificial intelligence
          </p>
        </div>
        <div className="space-y-6 mt-2">
          <div className="space-y-2">
            <label className="flex items-center font-medium text-gray-700 text-md">
              <IoMdSettings className="mr-2 text-blue-600" />
              Number of {type}
            </label>
            <div className="relative">
              <input
                type="number"
                min="5"
                max="50"
                value={config.numQuestions}
                onChange={(e) =>
                  handleConfigChange(
                    "numQuestions",
                    Math.max(1, parseInt(e.target.value))
                  )
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none  bg-white"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FaRegLightbulb className="text-yellow-500" />
              </div>
            </div>
            <p className="text-xs text-gray-500 italic pl-1">
              {type == "quiz"
                ? " AI will generate unique questions based on this number"
                : "AI will generate flashcard based on this number"}
            </p>
          </div>
        </div>
        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className="
    w-full mt-6
    disabled:cursor-not-allowed cursor-pointer
    py-4 px-4
    bg-gradient-to-r from-blue-400 to-blue-600
    hover:from-blue-600 hover:to-blue-400
    text-white font-medium rounded-lg
    flex items-center justify-center
    space-x-2      
    transition-colors shadow-md
  "
        >
           {isLoading && <Spinner />} <span>Generate AI {type === "quiz" ? "Quiz" : "Flashcard"}</span>
         
        </button>
      </div>
    </Modal>
  );
}
