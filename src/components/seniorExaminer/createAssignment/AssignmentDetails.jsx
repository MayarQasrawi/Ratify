import { FiCalendar, FiUser, FiFileText } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import useGetCreationAssignment from "../../../hooks/examiner/useGetCreationAssignments";
import useCancelAssignments from "../../../hooks/seniorExaminer/createAssignment/useCancelAssignmentCreation";
import Modal from "../../shared/modal/Modal";
import ConfirmationModal from "../../shared/modal/ConfirmationModal";

export default function AssignmentDetails({ examiner, onClose }) {
  console.log(examiner, "examiner inside cancel assign");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const {
    data: examinerAssignment,
    isLoading,
    error,
  } = useGetCreationAssignment(examiner.id, true);
  const {
    mutate: cancelAssignment,
    isPending: isCancelPending,
    isSuccess: IsSuccess,
    isError: IsError,
    data,
  } = useCancelAssignments();

  console.log(examinerAssignment, "examinerAssignment");

  const handleSelectAssignment = (assignment) => {
    console.log(assignment, "handleSelectAssignment");
    setSelectedAssignment(assignment);
  };
  return (
    <>
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 flex gap-1.5 items-center capitalize">
            <FiUser size={20} className="text-gray-600" />
            {examiner.fullName} Assignment Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <MdClose className="w-7 h-7" />
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Loading assignments...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="text-red-600 mb-2">Error loading assignments</div>
              <p className="text-gray-600 text-sm">{error.message}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : !examinerAssignment?.data ||
            examinerAssignment.data.length === 0 ? (
            <div className="text-center py-6">
              <div className="text-gray-500 mb-2">
                <FiFileText size={48} className="mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium">No Assignments Found</h3>
                <p className="text-sm mt-2">
                  This examiner currently has no assignments.
                </p>
              </div>
            </div>
          ) : (
            !showCancelModal && (
              <div className="space-y-4">
                <div>
                  <div className="space-y-3  overflow-y-auto">
                    {examinerAssignment.data.map((assignment) => (
                      <div
                        key={assignment.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedAssignment?.id === assignment.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                        onClick={() => handleSelectAssignment(assignment)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">
                              {assignment.stageName}
                            </h4>
                            <div className="flex gap-2 mt-1">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  assignment.type === "Exam"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {assignment.type}
                              </span>
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {assignment.trackName}
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  assignment.status === "Assigned"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : assignment.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {assignment.status}
                              </span>
                            </div>
                          </div>
                          <input
                            type="radio"
                            name="assignment"
                            checked={selectedAssignment?.id === assignment.id}
                            onChange={() => handleSelectAssignment(assignment)}
                            className="mt-1"
                          />
                        </div>

                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex items-center gap-2">
                            <FiCalendar size={14} />
                            <span>
                              Due:{" "}
                              {assignment.dueDate?.split("T")[0] || "Not set"}
                            </span>
                            {assignment.daysRemaining !== undefined && (
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  assignment.daysRemaining === 0
                                    ? "bg-red-100 text-red-800"
                                    : assignment.daysRemaining < 2
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {assignment.daysRemaining === 0
                                  ? "Due Today"
                                  : `${assignment.daysRemaining} days left`}
                              </span>
                            )}
                          </div>
                          <div>
                            Assigned:{" "}
                            {assignment.assignedDate?.split("T")[0] ||
                              "Not set"}
                          </div>
                          {assignment.notes && (
                            <div className="text-gray-500 text-xs">
                              Notes:{" "}
                              {assignment.notes.length > 50
                                ? `${assignment.notes.substring(0, 50)}...`
                                : assignment.notes}
                            </div>
                          )}
                        </div>
                        <div className="mt-3">
                          {assignment.type === "Exam" && (
                            <button
                              onClick={() => {
                               
                              }}
                              className="px-4 py-2 cursor-pointer rounded-full bg-blue-600 text-white text-sm font-medium  hover:bg-blue-700 focus:outline-none  dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-300 transition"
                            >
                              Confirm
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowCancelModal(true)}
                    className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                      selectedAssignment
                        ? "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!selectedAssignment}
                  >
                    Cancel Selected Assignment
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {showCancelModal && (
        <Modal>
          <ConfirmationModal
            view={true}
            Cancle={onClose}
            Confirm={() => cancelAssignment(selectedAssignment.id)}
            isPending={isCancelPending}
            isSuccess={IsSuccess}
            isError={IsError}
            data={data}
          >
            Are you sure you want to cancel the assignment "
            {selectedAssignment?.stageName}" for {examiner.fullName}?
          </ConfirmationModal>
        </Modal>
      )}
    </>
  );
}
