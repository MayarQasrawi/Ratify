import { FaStickyNote } from "react-icons/fa";
import {
  FiUser,
  FiBookOpen,
  FiClock,
  FiTarget,
  FiCalendar,
  FiAward,
} from "react-icons/fi";
import { MdClose } from "react-icons/md";

export default function ExamDetailsModal({
  cancelAction,
  selectedRequest,
  extraInfo,
}) {
  console.log(extraInfo, "extraInfo");

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-custom">
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Exam Request Details
        </h2>
        <button
          onClick={cancelAction}
          className="text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          <MdClose className="w-6 h-6" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <FiUser className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Applicant Information
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 ml-8">
            <span className="font-medium">Name:</span>{" "}
            {selectedRequest.applicant.fullName}
          </p>
          <p className="text-gray-700 dark:text-gray-300 ml-8">
            <span className="font-medium">Email:</span>{" "}
            {selectedRequest.applicant.email}
          </p>
        </div>
             <div className="bg-yellow-50 dark:bg-yellow-950 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <FaStickyNote className="w-3 h-3 text-yellow-600 dark:text-yellow-300 mt-0.5 flex-shrink-0" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Note
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 ml-8">
            <span className="font-medium">Note:</span> { selectedRequest.instructions}
          </p>
        </div>
        <div className="bg-green-50 dark:bg-green-950 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <FiAward className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Level Information
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 ml-8">
            <span className="font-medium">Level:</span> {extraInfo.level}
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <FiCalendar className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Current Stage
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 ml-8">
            <span className="font-medium">Stage:</span> {extraInfo.stage}
          </p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-950 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-4">
            <FiBookOpen className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Exam Details
            </h3>
          </div>
          <div className="ml-8 space-y-3">
            <div className="flex items-center gap-3">
              <FiClock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Duration:
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {selectedRequest.exam.durationMinutes} minutes
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FiTarget className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Difficulty:
              </span>
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium cursor-pointer ${
                  selectedRequest.exam.difficulty === "Easy"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : selectedRequest.exam.difficulty === "Medium"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                {selectedRequest.exam.difficulty}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
