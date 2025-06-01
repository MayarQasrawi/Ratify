import { useState } from "react";
import { FiUser, FiPlus, FiAlertCircle } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import Title from "../../../components/admin/shared/Title";
import { useAuthContext } from "../../../contexts/AuthProvider";
import Extract from "../../../utils/Extract";
import useFetchExaminersByTrack from "../../../hooks/seniorExaminer/workloads/useFetchExaminerByTrack";
import useFetchExaminerById from "../../../hooks/examiner/useFetchExaminerById";
import Modal from "../../../components/shared/modal/Modal";
import Spinner from "../../../components/shared/dashboard/Spinner";
import AssignmentModal from "../../../components/seniorExaminer/createAssignment/AssignmentModal";
import useGetTaskStages from "../../../hooks/seniorExaminer/createAssignment/useGetTaskStage";
import useGetExamStages from "../../../hooks/seniorExaminer/createAssignment/useGetExamStage";
import AssignmentType from "../../../components/seniorExaminer/createAssignment/AssignmentType";
import AssignmentDetails from "../../../components/seniorExaminer/createAssignment/AssignmentDetails";
import { FaCheckCircle, FaUser } from "react-icons/fa";
import Table from "../../../components/admin/shared/Table";
import Action from "../../../components/admin/shared/Action";
import useCancelAssignments from "../../../hooks/seniorExaminer/createAssignment/useCancelAssignmentCreation";
import ConfirmationModal from "../../../components/shared/modal/ConfirmationModal";
import useCompleteExam from "../../../hooks/seniorExaminer/createAssignment/useCompleteExam";
import useGetCreationAssignment from "../../../hooks/seniorExaminer/createAssignment/useGetCreationAssignment";
import Search from "../../../components/admin/shared/Search";
import Error from "../../../components/admin/shared/Error";
import { MdEmail } from "react-icons/md";

const cols = ["Examiner", "Stage", "Assigned Date", "Due Date", "Status", " "];

export default function AssignCreationAssignments() {
  const [selectedModal, setSelectedModal] = useState("");
  const [selectedExaminer, setSelectedExaminer] = useState();
  const [viewMode, setViewMode] = useState("table");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [search, setSearch] = useState("");
  const { auth } = useAuthContext();
  let role;
  let id;
  let isExaminer = false;
  if (auth) {
    id = Extract(auth, "nameid");
    role = Extract(auth, "role");
    isExaminer = role === "Examiner" || role === "SeniorExaminer";
  }
  const {
    data: creationAssignment,
    isLoading: isCreationAssignmentLoading,
    isError: isCreationAssignmentError,
  } = useGetCreationAssignment();
  console.log(creationAssignment, "GetCreationAssignment");
  let assignmentFilter = creationAssignment?.data;
  const { data: examinerInfo } = useFetchExaminerById(id, isExaminer);
  const {
    data: teams,
    isError,
    isLoading,
  } = useFetchExaminersByTrack(examinerInfo?.data?.workingTracks[0]?.id);

  const {
    data: taskStage,
    isError: isTaskStageError,
    isLoading: isTaskStageLoading,
  } = useGetTaskStages(examinerInfo?.data?.workingTracks[0]?.id);

  const {
    data: examStage,
    isError: isExamStageError,
    isLoading: isExamStageLoading,
  } = useGetExamStages(examinerInfo?.data?.workingTracks[0]?.id);

  const {
    mutate: cancelAssignment,
    isPending: isCancelPending,
    isSuccess: IsSuccess,
    isError: IsError,
    data,
    reset: resetCancel,
  } = useCancelAssignments();

  const {
    mutate: completeExam,
    isPending: isCompletePending,
    isSuccess: IsCompleteSuccess,
    isError: IsCompleteError,
    data: completeExamData,
    reset: resetCompleteExam,
  } = useCompleteExam();

  const handleCancelAssignment = (assignment) => {
    console.log(assignment, "handleCancelAssignment");
    setSelectedModal("cancel");
    setSelectedAssignment(assignment);
  };

  const handleConfirmExam = (assignment) => {
    console.log(assignment, "handleConfirmExam");
    setSelectedModal("confirm");
    setSelectedAssignment(assignment);
  };

  const renderRow = (item) => {
    const actions = [
      {
        name: "Cancel Assignment",
        onClick: () => handleCancelAssignment(item),
      },
      ...(item.type === "Exam"
        ? [
            {
              name: "Confirm Assignment",
              onClick: () => handleConfirmExam(item),
            },
          ]
        : []),
    ];

    return (
      <tr
        key={item.id}
        className="border border-[var(--table-border)] text-sm text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <td className="py-3 px-3">
          <div className="flex items-center space-x-2">
            <FiUser className="w-4 h-4 text-gray-500" />
            <span className="font-medium capitalize">{item.examinerName}</span>
          </div>
        </td>
        <td className="py-3 px-3">
          <span className="font-medium text-gray-900 dark:text-white">
            {item.stageName} ({item.type})
          </span>
        </td>
        <td className="py-3 px-3 text-sm text-gray-600">
          {item.assignedDate.split("T")[0]}
        </td>
        <td className="py-3 px-3 text-sm text-gray-600">
          {item.dueDate.split("T")[0]}
        </td>
        <td className="py-3 px-3">
          <div className="flex items-center space-x-1">
            {item.status == "Overdue" ? (
              <FiAlertCircle className="w-4 h-4 text-red-500" />
            ) : (
              <FaCheckCircle className="w-4 h-4 text-green-500" />
            )}
            <span className="text-sm">
              {item.status}
              <span className={`px-2 py-1 rounded-full text-sm font-medium }`}>
                ({item.daysRemaining} days)
              </span>
            </span>
          </div>
        </td>
        {item.status != "Overdue" && (
          <td>
            <Action actions={actions} />
          </td>
        )}
      </tr>
    );
  };

  if (isLoading || isCreationAssignmentLoading)
    return <Spinner text="Assign Creation Assignments" />;
   if (isCreationAssignmentError) {
        return (
          <>
          <div className="mt-8 pl-4 mb-6">
              <Title> Assign Creation Assignments</Title>
            </div>
          <div className="h-[50vh]  flex items-center justify-center ">
              <Error />
          </div>
          </>
        );
      }
  if (search)
    assignmentFilter = assignmentFilter.filter((assignment) =>
      assignment.examinerName.toUpperCase().includes(search.toUpperCase())
    );
  return (
    <>
      {selectedModal == "assign" && (
        <Modal>
          <AssignmentType
            onClose={() => setSelectedModal("")}
            id={examinerInfo?.data?.id}
            examiner={teams?.data.filter((t) => t.id != examinerInfo?.data?.id)}
            stages={{ task: taskStage?.data, exam: examStage?.data }}
          />
        </Modal>
      )}
      {selectedModal == "show Details" && (
        <Modal>
          <AssignmentDetails
            examiner={selectedExaminer}
            onClose={() => {
              setSelectedModal("");
              setSelectedExaminer(null);
            }}
          />
        </Modal>
      )}
      {selectedModal == "cancel" && (
        <Modal>
          <ConfirmationModal
            view={true}
            Confirm={() => cancelAssignment(selectedAssignment.id)}
            isPending={isCancelPending}
            isSuccess={IsSuccess}
            isError={IsError}
            data={data}
            Cancle={() => {
              setSelectedModal("");
              setSelectedAssignment(null);
              resetCancel();
            }}
          >
            Are you sure you want to cancel the assignment "
            {selectedAssignment?.stageName}" for{" "}
            {selectedAssignment.examinerName}?
          </ConfirmationModal>
        </Modal>
      )}
      {selectedModal == "confirm" && (
        <Modal>
          <ConfirmationModal
            view={true}
            Confirm={() => completeExam(selectedAssignment.id)}
            isPending={isCompletePending}
            isSuccess={IsCompleteSuccess}
            isError={IsCompleteError}
            data={completeExamData}
            Cancle={() => {
              setSelectedModal("");
              setSelectedAssignment(null);
              resetCompleteExam();
            }}
          >
            Are you sure you want to Confirm the assignment "
            {selectedAssignment?.stageName}" for{" "}
            {selectedAssignment.examinerName}?
          </ConfirmationModal>
        </Modal>
      )}
      <div className="min-h-screen p-6 ">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="rounded-lg p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <Title className="text-gray-900 dark:text-gray-100">
                Assign Creation Assignments
              </Title>
              <div className="flex items-center gap-4 mt-6 mb-4">
                <button
                  onClick={() => setSelectedModal("assign")}
                  className="bg-blue-500 dark:bg-blue-600 cursor-pointer hover:bg-blue-700 dark:hover:bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-300"
                >
                  <FiPlus className="w-4 h-4" />
                  Create Assignment
                </button>
              </div>
            </div>
            <div className="w-[90%] md:w-[36%] lg:w-[44%] md:min-w-70 md:max-w-[340px]">
              <Search search={search} setSearch={setSearch} />
            </div>
            <div className="pl-4 mt-2.5 text-sm">
              <div className="flex gap-6">
                <button
                  onClick={() => setViewMode("table")}
                  className={`cursor-pointer pb-2 ${
                    viewMode === "table"
                      ? "border-b-2 border-blue-600 text-gray-900 dark:text-white font-medium"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode("Grouped By Examiner")}
                  className={`cursor-pointer pb-2 ${
                    viewMode === "Grouped By Examiner"
                      ? "border-b-2 border-blue-600 text-gray-900 dark:text-white font-medium"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Grouped By Examiner
                </button>
              </div>
            </div>
          </div>
          {viewMode == "table" ? (
            <Table cols={cols} data={assignmentFilter} row={renderRow} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams?.data &&
                teams?.data
                  .filter((t) => t.id != examinerInfo?.data?.id)
                  .map((examiner) => (
                    <div
                      key={examiner.id}
                      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                              <FaUser className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white text-lg truncate">
                              {examiner.fullName}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-4">
                            <MdEmail className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm truncate">
                              {examiner.email}
                            </span>
                          </div>

                          <span className="inline-block bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-medium px-3 py-1 rounded-full">
                            {examinerInfo.data.workingTracks[0].name}
                          </span>
                        </div>

                        <div
                          onClick={() => {
                            setSelectedModal("show Details");
                            setSelectedExaminer(examiner);
                          }}
                          className="ml-4 p-2 text-gray-400 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                        >
                          <IoSearch className="w-5 h-5 cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
