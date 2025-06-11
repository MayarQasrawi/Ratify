import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import Table from "@/components/admin/shared/Table";
import Title from "@/components/admin/shared/Title";
import Modal from "@/components/shared/modal/Modal";
import useGetExaminerFeedback from "@/hooks/examiner/feedback/useGetExaminerFeedback";
import Loading from "@/components/admin/shared/Loading";
const columns = ["Applicant Name", "Score", "Comment", "Feedback Date"];

export default function ManageFeedback() {
  const [selectedComment, setSelectedComment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: getFeedback, isLoading } = useGetExaminerFeedback();
  console.log(getFeedback, "getFeedback getFeedback");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getScoreStyle = (score) => {
    if (score >= 80)
      return "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 border-green-200 dark:border-green-700";
    if (score >= 60)
      return "bg-yellow-100 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-100 border-yellow-200 dark:border-yellow-600";
    if (score >= 40)
      return "bg-orange-100 dark:bg-orange-700 text-orange-800 dark:text-orange-100 border-orange-200 dark:border-orange-600";
    return "bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-100 border-red-200 dark:border-red-600";
  };

  const handleCommentClick = (comment) => {
    setSelectedComment(comment);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedComment(null);
  };

  const renderRow = (fb) => (
    <tr
      key={fb.id}
      className="even:bg-white cursor-pointer odd:bg-gray-50 dark:even:bg-gray-900 dark:odd:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      <td className="px-6 py-4 text-center font-medium text-gray-700 dark:text-gray-200">
       Abrar Arman
      </td>
      <td className="px-6 py-4 text-center">
        <span
          className={`inline-flex items-center space-x-1 px-4 py-1 rounded-md text-[0.8rem] font-semibold border ${getScoreStyle(
            fb.totalScore
          )}`}
        >
          <span>{fb.totalScore}</span>
        </span>
      </td>

      <td className="px-6 py-4">
        <button
          onClick={() => handleCommentClick(fb.comments)}
          className="w-full cursor-pointer  text-center text-blue-500 dark:text-blue-400 hover:underline truncate text-sm"
          title="View full comment"
        >
          View comment
        </button>
      </td>

      <td className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        {formatDate(fb.feedbackDate)}
      </td>
    </tr>
  );
  if (isLoading)
    return (
      <>
        <div className="mt-8 pl-4 mb-6">
          <Title>Manage Feedback</Title>
        </div>
        <div className="h-[50vh] flex items-center w-full ">
          <div className="flex-1">
            <Loading text={"Fetching Tracks..."} />
          </div>
        </div>
      </>
    );
  return (
    <div className="p-6 min-h-screen text-gray-800 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        <Title>Manage Feedback </Title>
        <div className="rounded-xl mt-7 shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
          <Table
            cols={columns}
            data={getFeedback.data}
            row={renderRow}
            headerColor="bg-gray-50 dark:bg-gray-800 shadow-sm"
            headerTextColor="text-gray-700 dark:text-gray-300 uppercase tracking-wide text-sm"
          />
        </div>
      </div>

      {isModalOpen && (
        <Modal >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-lg w-full animate-[fadeIn_0.2s] mx-auto my-8">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-600">
              <h2 className="text-lg font-semibold font-mono">Full Comment</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 cursor-pointer  hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
              >
                <MdClose />
              </button>
            </div>
            <div className="p-6 whitespace-pre-wrap text-gray-700 dark:text-gray-100">
              {selectedComment}
            </div>
            <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
