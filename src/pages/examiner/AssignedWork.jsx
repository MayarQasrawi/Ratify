import React, { useEffect, useState } from "react";
import {
  FaTasks,
  FaGraduationCap,
  FaUser,
  FaCalendarAlt,
  FaStickyNote,
  FaClock,
  FaSearch,
} from "react-icons/fa";
import Title from "../../components/admin/shared/Title";
import Search from "../../components/admin/shared/Search";
import { IoMdAddCircleOutline } from "react-icons/io";
import useGetTaskCreation from "../../hooks/examiner/task/useGetTaskCreation";
import useGetExamCreation from "../../hooks/examiner/exam/useGetExamCreation";
import Spinner from "../../components/shared/dashboard/Spinner";
import { useNavigate } from "react-router-dom";
const getPriorityColor = (daysRemaining) => {
  if (daysRemaining <= 0)
    return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200";
  if (daysRemaining <= 3)
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200";
  return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200";
};

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200";
    case "Medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200";
    case "Hard":
      return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  }
};
export default function AssignedWork() {
  const [activeTab, setActiveTab] = useState("exam");
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState();
  const navigate = useNavigate();
  const { data: taskCreation, isLoading: isTaskCreationLoading } =
    useGetTaskCreation(activeTab == "task");
  console.log(taskCreation?.data, "taskCreation ..");
  const {
    data: examCreation,
    error,
    isLoading: isExamCreationLoading,
  } = useGetExamCreation(activeTab == "exam");
  console.log(examCreation?.data, "examCreation");

  const currentData =
    activeTab === "exam" ? examCreation?.data : taskCreation?.data;

  const groupedByStage =
    currentData &&
    currentData.reduce((acc, item) => {
      const stage = item.stageName || "Uncategorized";
      if (!acc[stage]) acc[stage] = [];
      acc[stage].push(item);
      return acc;
    }, {});

  const filteredData =
    currentData &&
    Object.entries(groupedByStage).reduce((acc, [stage, items]) => {
      const filtered = items.filter((item) => {
        const search = searchTerm.toLowerCase();
        return (
          item.stageName?.toLowerCase().includes(search) 
        );
      });
      if (filtered.length > 0) acc[stage] = filtered;
      return acc;
    }, {});
console.log(filteredData,'filteredData filteredData')
  console.log(selected,'selected selected selected kkkkkkkkkkkkkkkkkkk')
  if (isExamCreationLoading || isTaskCreationLoading)
    return <Spinner text={"Assigned Work Page"} />;
  return (
    <div className="min-h-screen  text-gray-900 dark:text-gray-100" id='sec'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div>
          <header className="flex justify-between">
            <Title>Assigned Work</Title>
            {selected && (
              <button
                onClick={() =>
                  navigate("/dashboard/examiner/add-task", {
                    state: { tasksPool: selected.tasksPool },
                  })
                }
                className="flex gap-1 items-center cursor-pointer hover:text-blue-500"
              >
                <IoMdAddCircleOutline className="mr-1" size={18} />
                <span>Add Task </span>
              </button>
            )}
          </header>
          <div className="w-full sm:w-2/3 md:w-1/2 lg:w-[50%] mt-8">
            <Search search={searchTerm} setSearch={setSearchTerm} />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab("exam")}
            className={`px-4 py-2 cursor-pointer rounded-full font-medium transition-colors flex items-center gap-2 ${
              activeTab === "exam"
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-purple-100 shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-800"
            }`}
          >
            <FaGraduationCap className="w-4 h-4" />
            Exams ({examCreation?.data.filter(exam=>exam.status !='Overdue').length})
          </button>
          <button
            onClick={() => setActiveTab("task")}
            className={`px-4 py-2 cursor-pointer rounded-full font-medium transition-colors flex items-center gap-2 ${
              activeTab === "task"
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-purple-100 shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-800"
            }`}
          >
            <FaTasks className="w-4 h-4" />
            Tasks {activeTab == "task" && `(${taskCreation?.data.filter(task=>task.status !='Overdue').length})`}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid gap-6">
          {Object.keys(filteredData).map((stageName) => (
         filteredData[stageName]
                    .filter((stg) => stg.status != "Overdue").length > 0  &&  <div
              key={stageName}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800  dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-blue-700 font-mono dark:text-white">
                    {stageName} Stage
                  </h2>
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 px-2 py-1 rounded-full text-sm font-medium">
                    {filteredData[stageName].length} items
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredData[stageName]
                    .filter((stg) => stg.status != "Overdue").
                   map((item) => (
                      <a
                        key={item.id}
                        href='#sec'
                        onClick={
                          activeTab == "task" ? () => setSelected(item) : null
                        }
                        className={`bg-white dark:bg-gray-700 cursor-pointer ${
                          selected?.id ==item.id && "border-blue-500 border-2"
                        } rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div
                              className={`p-1.5 rounded ${
                                item.type === "Exam"
                                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
                                  : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200"
                              }`}
                            >
                              {item.type === "Exam" ? (
                                <FaGraduationCap className="w-3 h-3" />
                              ) : (
                                <FaTasks className="w-3 h-3" />
                              )}
                            </div>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {item.type}
                            </span>
                          </div>
                          {item.trackName && (
                            <span className="bg-blue-50 dark:bg-blue-800 text-blue-700 dark:text-blue-100 px-2 py-1 rounded text-xs font-medium">
                              {item.trackName}
                            </span>
                          )}
                        </div>
                        {item.exam && (
                          <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-800 rounded">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <FaClock className="w-3 h-3 text-blue-600 dark:text-blue-200" />
                                <span className="text-sm text-gray-700 dark:text-gray-200">
                                  {item.exam.durationMinutes}m
                                </span>
                              </div>
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium  ${getDifficultyColor(
                                  item.exam.difficulty
                                )}`}
                              >
                                {item.exam.difficulty}
                              </span>
                            </div>
                          </div>
                        )}
                        {item.notes && (
                          <div className="mb-3 p-2 bg-yellow-50 dark:bg-yellow-900 rounded border-l-2 border-yellow-300 dark:border-yellow-700">
                            <div className="flex gap-2">
                              <FaStickyNote className="w-3 h-3 text-yellow-600 dark:text-yellow-300 mt-0.5 flex-shrink-0" />
                              <p className="text-xs text-gray-700 dark:text-gray-100 leading-relaxed">
                                {item.notes}
                              </p>
                            </div>
                          </div>
                        )}
                        <div className=" dark:border-gray-600 pt-3 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-300">
                              <FaCalendarAlt className="w-3 h-3" />
                              <span>Due: {item.dueDate.split("T")[0]}</span>
                            </div>
                            <div
                              className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(
                                item.daysRemaining
                              )}`}
                            >
                              {item.daysRemaining <= 0
                                ? "Overdue"
                                : `${item.daysRemaining}d left`}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-300">
                            Assigned: {item.assignedDate.split("T")[0]}
                          </div>
                        </div>
                      </a>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        {Object.keys(filteredData).length === 0 && (
          <div className="text-center py-12 w-full">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 ">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FaSearch className="w-6 h-6 text-gray-400 dark:text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No results found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or check back later for new
                assignments.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
