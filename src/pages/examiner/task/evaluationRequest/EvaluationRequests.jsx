import React, { useState, useEffect } from "react";
import {
  FaTasks,
  FaCalendarAlt,
  FaBookOpen,
  FaClipboardList,
  FaClock,
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";
import Table from "../../../../components/admin/shared/Table";
import Title from "../../../../components/admin/shared/Title";
import useGetPendingRequest from "../../../../hooks/examiner/evaluationRequest/useGetPendingRequest";
import Loading from "../../../../components/admin/shared/Loading";

export default function EvaluationRequests() {
  const [activeTab, setActiveTab] = useState("tasks");
  const [loading, setLoading] = useState({
    taskSubmissions: false,
    examReviews: false,
    scheduledInterviews: false,
  });
  const [taskSubmissions, setTaskSubmissions] = useState([]);
  const [examReviews, setExamReviews] = useState([]);
  const [scheduledInterviews, setScheduledInterviews] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    tasks: { key: null, direction: null },
    interviews: { key: null, direction: null },
  });
  const {
    data: pendingRequest,
    isLoading,
    isError,
    error,
  } = useGetPendingRequest({
    endpoint: `Workloads/${
      activeTab == "tasks"
        ? "task-submissions"
        : activeTab == "interviews"
        ? "scheduled-interviews"
        : "exam-reviews"
    }`,
    enable:
      activeTab == "tasks" || activeTab == "interviews" || activeTab == "exams",
  });
  console.log(pendingRequest, ";;;;;;;;;;;;;;;;;;;;;;;;;;;;;pending request ");
  console.log(activeTab, "///");

  const handleSort = (key, tabType) => {
    let direction = "asc";
    if (
      sortConfig[tabType].key === key &&
      sortConfig[tabType].direction === "asc"
    ) {
      direction = "desc";
    }

    setSortConfig((prev) => ({
      ...prev,
      [tabType]: { key, direction },
    }));

    if (tabType === "tasks") {
      const sortedTasks = [...taskSubmissions].sort((a, b) => {
        let aValue, bValue;
        if (key === "dates") {
          aValue = new Date(a.submissionDate.split("T")[0]);
          bValue = new Date(b.submissionDate.split("T")[0]);
        }

        if (direction === "asc") {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      });
      setTaskSubmissions(sortedTasks);
    } else if (tabType === "interviews") {
      const sortedInterviews = [...scheduledInterviews].sort((a, b) => {
        let aValue, bValue;
        if (key === "datetime") {
          aValue = new Date(a.scheduledDate.split("T")[0]);
          bValue = new Date(b.scheduledDate.split("T")[0]);
        }

        if (direction === "asc") {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      });
      setScheduledInterviews(sortedInterviews);
    }
  };
  const getSortIcon = ( tabType) => {
    if (sortConfig[tabType].direction === "asc") {
      return <FaSortUp className="text-blue-600" size={12} />;
    }
    return <FaSortDown className="text-blue-600" size={12} />;
  };

  const fetchTaskSubmissions = async () => {
    try {
      const mockData = [
        {
          id: 1,
          taskId: 101,
          taskTitle: "Frontend React Component",
          applicantId: "APP001",
          submissionUrl: "https://github.com/user/task-101",
          submissionDate: "2024-05-20T10:30:00Z",
          dueDate: "2024-05-22T23:59:59Z",
          daysWaiting: 3,
          isLate: false,
          status: "Submitted",
          stageName: "Technical Assessment",
          trackName: "Frontend Development",
        },
        {
          id: 2,
          taskId: 102,
          taskTitle: "API Development Task",
          applicantId: "APP002",
          submissionUrl: "https://github.com/user/task-102",
          submissionDate: "2024-05-21T14:15:00Z",
          dueDate: "2024-05-20T23:59:59Z",
          daysWaiting: 2,
          isLate: true,
          status: "Submitted",
          stageName: "Technical Assessment",
          trackName: "Backend Development",
        },
      ];
      setTaskSubmissions(mockData);
    } catch (error) {
      console.error("Error fetching task submissions:", error);
    }
  };

  const fetchExamReviews = async () => {
    try {
      const mockData = [
        {
          id: 1,
          applicantName: "Abrar",
          durationMinutes: "2 hours",
          status: "Pending Review",
          stageName: "Technical Assessment",
          trackName: "Backend Development",
        },
        {
          id: 2,
          applicantName: "Abrar",
          durationMinutes: "3 hours",
          status: "Pending Review",
          stageName: "Technical Assessment",
          trackName: "Backend Development",
        },
      ];
      setExamReviews(mockData);
    } catch (error) {
      console.error("Error fetching exam reviews:", error);
    }
  };

  const fetchScheduledInterviews = async () => {
    try {
      const mockData = [
        {
          id: 1,
          applicantName: "Abrar",
          durationMinutes: "2 hours",
          status: "scheduled",
          stageName: "Technical Assessment",
          trackName: "Backend Development",
          scheduledDate: "2024-05-21T14:15:00Z",
        },
        {
          id: 2,
          applicantName: "Abrar",
          durationMinutes: "3 hours",
          status: "scheduled",
          stageName: "Technical Assessment",
          trackName: "Backend Development",
          scheduledDate: "2024-05-21T14:15:00Z",
        },
      ];
      setScheduledInterviews(mockData);
    } catch (error) {
      console.error("Error fetching scheduled interviews:", error);
    }
  };

  useEffect(() => {
    fetchTaskSubmissions();
    fetchExamReviews();
    fetchScheduledInterviews();
  }, []);

  const tabs = [
    {
      id: "tasks",
      label: "Tasks",
      count: taskSubmissions.length,
      icon: FaTasks,
    },
    {
      id: "interviews",
      label: "Interviews",
      count: scheduledInterviews.length,
      icon: FaCalendarAlt,
    },
    {
      id: "exams",
      label: "Exams",
      count: examReviews.length,
      icon: FaBookOpen,
    },
  ];

  const renderTaskSubmissionRow = (item) => (
    <tr
      key={item.id}
      className="text-md border-b last:border-b-0 last:rounded-b-lg border-[var(--table-border)] text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
            <FaTasks className="text-blue-600 dark:text-blue-300" size={16} />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {item.taskTitle}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 dark:text-gray-100">
          {item.stageName}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {item.trackName}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center justify-between">
          <div>
            <div>
              Submitted: {item.submissionDate.split("T")[0]}
              {item.isLate && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300">
                  Late
                </span>
              )}
            </div>
            <div>Due: {item.dueDate.split("T")[0]}</div>
          </div>
          <div
            className="cursor-pointer p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
            onClick={() => handleSort("dates", "tasks")}
          >
            {getSortIcon("tasks")}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <FaClock
            className="text-gray-400 dark:text-gray-500 mr-1"
            size={16}
          />
          <span className="text-sm text-gray-900 dark:text-gray-100">
            {item.daysWaiting} days
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="inline-flex cursor-pointer  items-center gap-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-3 py-1.5 rounded-md hover:bg-green-200 dark:hover:bg-green-800 transition">
          Evaluate
        </button>
      </td>
    </tr>
  );

  const renderExamReviewRow = (item) => (
    <tr
      key={item.id}
      className="text-md border-b last:border-b-0 last:rounded-b-lg border-[var(--table-border)] text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
            <FaBookOpen
              className="text-purple-600 dark:text-purple-300"
              size={16}
            />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {item.applicantName}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className=" text-center">
          <div className="text-sm text-gray-900 dark:text-gray-100">
            {item.stageName}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {item.trackName}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap ">
        <div className="flex items-center justify-center">
          <FaClock
            className="text-gray-400 dark:text-gray-500 mr-1"
            size={16}
          />
          <span className="text-sm text-gray-900 dark:text-gray-100 text-center">
            {item.durationMinutes}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap ">
        <div className="flex justify-center">
          <span className=" px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
            {item.status}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="inline-flex cursor-pointer items-center gap-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-3 py-1.5 rounded-md hover:bg-green-200 dark:hover:bg-green-800 transition">
          Evaluate
        </button>
      </td>
    </tr>
  );

  const renderScheduledInterviewRow = (item) => (
    <tr
      key={item.id}
      className="text-md border-b last:border-b-0 last:rounded-b-lg border-[var(--table-border)] text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-3">
            <FaCalendarAlt
              className="text-indigo-600 dark:text-indigo-300"
              size={16}
            />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {item.applicantName}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 dark:text-gray-100">
          {item.stageName}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {item.trackName}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex justify-center items-center gap-2">
          <div className="text-sm text-gray-900 dark:text-gray-100">
            {item.scheduledDate.split("T")[0]}
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {item.scheduledDate.split("T")[1].slice(0, -1)}
            </div>
          </div>
          <div
            className="cursor-pointer p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
            onClick={() => handleSort("datetime", "interviews")}
          >
            {getSortIcon("interviews")}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className=" justify-center flex">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
            {item.status}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="inline-flex cursor-pointer items-center gap-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-3 py-1.5 rounded-md hover:bg-green-200 dark:hover:bg-green-800 transition">
          Evaluate
        </button>
      </td>
    </tr>
  );

  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FaClipboardList className="text-gray-400" size={32} />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No items to review
      </h3>
      <p className="text-gray-500">
        All evaluation queues are currently empty.
      </p>
    </div>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          <div className="h-[50vh] flex items-center w-full ">
            <div className="flex-1">
              <Loading text={"Fetching Request..."} />
            </div>
          </div>
        </>
      );
    }
    switch (activeTab) {
      case "tasks":
        if (taskSubmissions.length === 0) return <EmptyState />;
        return (
          <div className="max-w-[900px] scrollbar-custom">
            <Table
              cols={[
                "Task Title",
                "Track/ Stage",
                "Dates",
                "Waiting Time",
                " ",
              ]}
              data={taskSubmissions}
              row={renderTaskSubmissionRow}
            />
          </div>
        );
      case "interviews":
        if (scheduledInterviews.length === 0) return <EmptyState />;
        return (
          <div className="max-w-[900px] scrollbar-custom">
            <Table
              cols={["Candidate", "Track/ Stage", "Date & Time", "Status", " "]}
              data={scheduledInterviews}
              row={renderScheduledInterviewRow}
            />
          </div>
        );
      case "exams":
        if (examReviews.length === 0) return <EmptyState />;
        return (
          <div className="max-w-[900px] scrollbar-custom">
            <Table
              cols={["Candidate", "Track/ Stage", "Duration", "Status", " "]}
              data={examReviews}
              row={renderExamReviewRow}
            />
          </div>
        );
      default:
        return <EmptyState />;
    }
  };

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <Title>Pending Evaluations</Title>
        </header>
        {!isLoading && (
          <div className="flex gap-2 mb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 cursor-pointer rounded-full flex items-center gap-2 text-sm font-medium transition-colors
          ${
            isActive
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-purple-100 shadow-sm"
              : "text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-800"
          }`}
                >
                  {Icon && <Icon size={16} />}
                  {tab.label}
                  {tab.count > 0 && (
                    <span
                      className={`text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold
              ${
                isActive
                  ? "bg-blue-500 text-white dark:bg-blue-600"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
              }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
        <div>{renderContent()}</div>
      </div>
    </div>
  );
}
