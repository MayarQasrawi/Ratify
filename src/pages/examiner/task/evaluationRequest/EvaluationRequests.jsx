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
import Spinner from "../../../../components/shared/dashboard/Spinner";
import { useNavigate } from "react-router-dom";
import Error from "@/components/admin/shared/Error";

export default function EvaluationRequests() {
  const [activeTab, setActiveTab] = useState("exams");
  const navigate=useNavigate()
  const [loading, setLoading] = useState({
    taskSubmissions: false,
    examReviews: false,
    scheduledInterviews: false,
  });
  const [taskSubmissions, setTaskSubmissions] = useState([]);
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
  console.log(pendingRequest?.data, ";;;;;;;;;;;;;;;;;;;;;;;;;;;;;pending request evalc");
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



  const tabs = [
    {
      id: "tasks",
      label: "Tasks",
      count: pendingRequest?.data.length,
      icon: FaTasks,
    },
    {
      id: "interviews",
      label: "Interviews",
      count: pendingRequest?.data.length,
      icon: FaCalendarAlt,
    },
    {
      id: "exams",
      label: "Exams",
      count: pendingRequest?.data.length,
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
        <button onClick={()=>navigate('/dashboard/examiner/evaluation-work',{state:{stageProgressId:item.stageProgressId,taskSubmissionId:item.id,type:'Task',stageId:item.stageId,submissionUrl:item.submissionUrl

}})} className="inline-flex cursor-pointer  items-center gap-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-3 py-1.5 rounded-md hover:bg-green-200 dark:hover:bg-green-800 transition">
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
            {item.daysWaiting} days
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button  onClick={()=>navigate('/dashboard/examiner/evaluation-work',{state:{stageId:item.stageId,stageProgressId:item.stageProgressId,examRequestId:item.id,type:'Exam',applicantName:item.applicantName}})} className="inline-flex cursor-pointer items-center gap-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-3 py-1.5 rounded-md hover:bg-green-200 dark:hover:bg-green-800 transition">
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
        <div className=" text-center">
        <div className="text-sm text-gray-900 dark:text-gray-100">
          {item.stageName}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {item.trackName}
        </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center ">
        <div className="flex justify-center items-center gap-2 test-center">
          <div className="text-sm text-gray-900 dark:text-gray-100">
            <div className="text-sm text-gray-500 dark:text-gray-400 flex gap-1">
              <FaClock
            className="text-gray-400 dark:text-gray-500 mr-1"
            size={16}
          /> {item.durationMinutes}
            </div>
          </div>
          <div
            className="cursor-pointer p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
            onClick={() => handleSort("datetime", "interviews")}
          >
          </div>
        </div>
      </td>
    
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button onClick={()=>navigate('/dashboard/examiner/evaluation-work',{state:{stageId:item.stageId,stageProgressId:item.stageProgressId,interviewRequestId:item.id,type:'Interview',applicantName:item.applicantName}})} className="inline-flex cursor-pointer items-center gap-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-3 py-1.5 rounded-md hover:bg-green-200 dark:hover:bg-green-800 transition">
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
        if (pendingRequest?.data.length === 0) return <EmptyState />;
        return (
          <div className=" scrollbar-custom">
            <Table
              cols={[
                "Task Title",
                "Track/ Stage",
                "Dates",
                "Waiting Time",
                " ",
              ]}
              data={pendingRequest?.data}
              row={renderTaskSubmissionRow}
            />
          </div>
        );
      case "interviews":
        if (pendingRequest?.data.length === 0) return <EmptyState />;
        return (
          <div className=" scrollbar-custom">
            <Table
              cols={["Candidate", "Track/ Stage", "Date & Time", " "]}
              data={pendingRequest?.data}
              row={renderScheduledInterviewRow}
            />
          </div>
        );
      case "exams":
        if (pendingRequest?.data.length === 0) return <EmptyState />;
        return (

        

          <div className=" scrollbar-custom">

            <Table
              cols={["Candidate", "Track/ Stage", "Waiting Time", " "]}
              data={pendingRequest?.data}
              row={renderExamReviewRow}
            />
          </div>
        );
      default:
        return <EmptyState />;
    }
  };
 
  if (isError) {
    return (
      <>
        <div className="mt-8 pl-4 mb-6">
          <Title>Pending {activeTab.slice(0,activeTab.length-1)} Evaluations</Title>
        </div>
        <div className="h-[50vh]  flex items-center justify-center ">
          <Error />
        </div>
      </>
    );
  }
  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center capitalize">
          <Title>Pending {activeTab.slice(0,activeTab.length-1)} Evaluations</Title>
        </header>
        {!isLoading && (
          <div className="flex gap-2 mb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              console.log(tab.count,'jjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
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
