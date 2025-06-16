import { useEffect, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { FaClock, FaCheck, FaTimes, FaCheckCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import Table from "../../../components/admin/shared/Table";
import IconActionButton from "../../../components/Button/IconActionButton";
import Action from "../../../components/admin/shared/Action";
import Title from "../../../components/admin/shared/Title";
import Modal from "../../../components/shared/modal/Modal";
import ExamModal from "../../../components/seniorExaminer/examRequest/ExamModal";
import ApproveAllModal from "../../../components/seniorExaminer/examRequest/ApproveAllModal";
import { useLocation, useNavigate } from "react-router-dom";
import useGetPendingExamRequest from "../../../hooks/seniorExaminer/examRequest/useGetPendingExamRequest";
import RejectModal from "../../../components/seniorExaminer/examRequest/RejectModal";
import Spinner from "../../../components/shared/Spinner";
import Back from "../../../components/shared/dashboard/Back";
import ExamDetailsModal from "../../../components/seniorExaminer/examRequest/ExamDetailsModal";
const columns = ["#", "Date", "Request Details", "Status", " "];

// const generateStaticData = () => {
//   const data = [];
//   for (let i = 0; i < 50; i++) {
//     const date = new Date();
//     date.setDate(date.getDate() - Math.floor(Math.random() * 30));
//     data.push({
//       id: i + 1,
//       scheduledDate: date.toISOString(),
//       status: "Pending",
//     });
//   }
//   return data;
// };

export default function ExamRequest() {
  const location = useLocation();
  console.log(location.state.stage.stageId, "inside exam pending request ");
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedAction, setSelectedAction] = useState(false);
  const [isApproveAllModalOpen, setIsApproveAllModalOpen] = useState(false);
  const {
    data: pendingExamRequest,
    isLoading,
    isSuccess,
  } = useGetPendingExamRequest(location.state.stage.stageId);
  const navigate = useNavigate();
  console.log(
    pendingExamRequest?.data,
    "pendingExamRequest ////////////////////////////////////",
    location.state
  );
  // useEffect(() => {
  //   const data = generateStaticData();
  //   setRequests(data);
  // }, []);

  useEffect(() => {
    if (isSuccess) {
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay() + currentWeek * 7);
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      const filtered = pendingExamRequest?.data.filter((request) => {
        const requestDate = new Date(request.scheduledDate);
        return requestDate >= startOfWeek && requestDate <= endOfWeek;
      });
      setFilteredRequests(filtered);
    }
  }, [currentWeek, isSuccess]);

  const handleApprove = (request) => {
    console.log(request, "handle approve");
    setSelectedRequest(request);
    setSelectedAction("Approve");
  };

  const handleReject = (request) => {
    console.log(request, "reject modal ,,,,,,,,,,,,,,,,,,,,,,,,");
    setSelectedRequest(request);
    setSelectedAction("reject");
  };

  const cancelAction = () => {
    setSelectedRequest(null);
    setSelectedAction(null);
  };

  const getAllRequestIds = () => {
    return filteredRequests.map((request) => request.id);
  };
  const getAllRequestIdsFromAllWeeks = () => {
    return requests.map((request) => request.id);
  };

  const handleApproveAll = () => {
    const requestIds = getAllRequestIds();
    console.log("Approving all requests for current week:", requestIds);

    const updatedRequests = requests.map((request) => {
      if (requestIds.includes(request.id)) {
        return { ...request, status: "approved" };
      }
      return request;
    });

    setRequests(updatedRequests);
    setIsApproveAllModalOpen(false);
  };

  const handleApproveAllFromAllWeeks = () => {
    const allRequestIds = getAllRequestIdsFromAllWeeks();
    console.log("Approving all requests from all weeks:", allRequestIds);
    const updatedRequests = requests.map((request) => ({
      ...request,
      status: "approved",
    }));

    setRequests(updatedRequests);
    setIsApproveAllModalOpen(false);
  };

  let count = 1;
  const renderRow = (request) => {
    const actions = [
      { name: "Approve", onClick: () => handleApprove(request) },
      { name: "Reject", onClick: () => handleReject(request) },
    ];
    return (
      <tr
        key={request.id}
        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-center"
      >
        <td className="py-3 px-3 text-center">{count++}</td>
        <td className="py-3 px-3 text-center">
          <div className="flex items-center justify-center space-x-1">
            <BiCalendar
              className="text-gray-400 dark:text-gray-300"
              size={16}
            />
            <span>{request.scheduledDate.split("T")[0]}</span>
          </div>
        </td>
        <td className="py-3 px-3 lg:px-3 text-center">
          <div
            className="w-full flex justify-center cursor-pointer"
            onClick={() => {
              setSelectedAction("details");
              setSelectedRequest(request);
            }}
          >
            <IconActionButton Icon={IoSearch} label="Details" color="green" />
          </div>
        </td>
        <td className="py-3 px-3 text-center">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              request.status === "approved"
                ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
            }`}
          >
            {request.status.toUpperCase()}
          </span>
        </td>
        <td className="p-3 ">
          <div className="flex justify-center">
            <Action actions={actions} />
          </div>
        </td>
      </tr>
    );
  };
  if (isLoading) return <Spinner text="Exam Pending Request" />;
  return (
    <>
      {selectedAction == "reject" && (
        <Modal>
          <RejectModal
            cancelAction={cancelAction}
            selectedRequest={selectedRequest}
          />
        </Modal>
      )}
      {selectedAction == "details" && (
        <Modal>
          <ExamDetailsModal
            cancelAction={cancelAction}
            selectedRequest={selectedRequest}
            extraInfo={{
              stage: location.state.stage.stageName,
              level: location.state.stage.levelName,
            }}
          />
        </Modal>
      )}
      {selectedAction == "Approve-All" && (
        <Modal>
          <ApproveAllModal
            cancelAction={cancelAction}
            selectedRequest={selectedRequest}
            allRequest={getAllRequestIdsFromAllWeeks}
            currentWeek={getAllRequestIds}
          />
        </Modal>
      )}
      {selectedAction == "Approve" && (
        <Modal>
          <ExamModal
            cancelAction={cancelAction}
            selectedRequest={selectedRequest}
          />
        </Modal>
      )}
      <div className="p-3 min-h-screen text-gray-900 dark:text-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 p-3 mb-5">
            <Back
              text="Back to  Exam Stages"
              onClick={() => navigate("/dashboard/seniorExaminer/exams-stages")}
            />
          </div>
          <div className="mb-6 flex justify-between items-center">
            <Title>Exam Request Management</Title>
            <button
              onClick={() => {
                setSelectedAction("Approve-All");
              }}
              disabled={filteredRequests?.length === 0}
              className="cursor-pointer hover:text-blue-500 dark:text-white disabled:bg-gray-400 disabled:cursor-not-allowed text-gray-900 px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Approve All ({filteredRequests?.length})
            </button>
          </div>

          <div className="flex flex-wrap gap-3 my-5">
            {[...Array(4)].map((_, index) => {
              const weekOffset = index - 3;
              const now = new Date();
              const startOfWeek = new Date(now);
              startOfWeek.setDate(
                now.getDate() - now.getDay() + weekOffset * 7
              );
              const endOfWeek = new Date(startOfWeek);
              endOfWeek.setDate(startOfWeek.getDate() + 6);
              const formatDate = (date) => {
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                return `${day}/${month}`;
              };
              let label;
              if (weekOffset === 0) label = "This Week";
              else if (weekOffset === -1) label = "Last Week";
              else if (weekOffset === -2) label = "2 Weeks Ago";
              else if (weekOffset === -3) label = "3 Weeks Ago";
              const dateRange = `${formatDate(startOfWeek)}-${formatDate(
                endOfWeek
              )}`;
              const isActive = currentWeek === weekOffset;
              return (
                <button
                  key={weekOffset}
                  onClick={() => setCurrentWeek(weekOffset)}
                  className={`cursor-pointer px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-2 border-blue-200 dark:border-blue-700"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border-2 border-transparent"
                  }`}
                >
                  <div className="text-center">
                    <div className="font-semibold">{label}</div>
                    <div className="text-xs opacity-75">{dateRange}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-900">
            {filteredRequests?.length > 0 ? (
              <Table cols={columns} data={filteredRequests} row={renderRow} />
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <FaClock className="mx-auto text-4xl mb-4" />
                <p className="text-lg">No exam requests found for this week</p>
                <p className="text-sm">
                  Try selecting a different week or check back later
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
