"use client";

import TaskTable from "./TaskTable";

import { MdCalendarToday } from "react-icons/md";
import { useEffect } from "react";

function TaskInfo({ assignedDate, dueDate, taskInfo }) {
  useEffect(() => {
    if (taskInfo?.id) {
      localStorage.setItem("AppTaskId", taskInfo.id);
    }
  }, [taskInfo]);

  if (!taskInfo) {
    return (
      <p className="text-center text-gray-600/10 rounded-lg py-10 px-5">
        No task assigned yet.
      </p>
    );
  }

  const { title, description, requirements, difficulty } = taskInfo;

  return (
    <div>
      <div className="flex text-center justify-start md:gap-10 gap-2 mb-5">
        {[assignedDate, dueDate].map((date, index) =>
          date ? (
            <div
              key={index}
              className="flex items-center gap-2 text-gray-600 font-light text-sm px-4 py-1 rounded-xl bg-gray-600/10 font-serif"
            >
              <MdCalendarToday className="w-4 h-4 inline" />
              <span className="font-medium">
                {index === 0 ? "Assigned:" : "Due:"}
              </span>{" "}
              {date
                ? new Date(date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </div>
          ) : (
            <div key={index}></div>
          )
        )}
      </div>

      {/* Option 1: Side by side layout (for desktop) */}
      <div className="flex flex-col space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0 items-start justify-center text-[var(--text-color)]">
        <div className="w-full mx-auto">
          <TaskTable
            dueDate={dueDate}
            difficulty={difficulty}
            description={description}
            title={title}
          />
        </div>
        <div className="w-full mx-auto">
          <RequirementsCardNumbered requirements={requirements} />
        </div>
      </div>

      {/* Option 2: Stacked layout (uncomment to use instead) */}
      {/* 
      <div className="flex flex-col space-y-6 max-w-2xl mx-auto">
        <TaskTable
          dueDate={dueDate}
          difficulty={difficulty}
          description={description}
          title={title}
        />
        <RequirementsCard requirements={requirements} />
      </div>
      */}
    </div>
  );
}

export default TaskInfo;

import { MdAssignment } from "react-icons/md";

// Alternative design with numbered list
export function RequirementsCardNumbered({
  requirements,
  title = "Requirements",
}) {
  const tasks = requirements
    ? requirements.split("\n").filter((task) => task.trim())
    : [];

  return (
    <div className="max-w-md mt-4">
      <div className="bg-white rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 text-[var(--main-color)]">
          <div className="flex items-center gap-2 border-b-2 pb-2">
            <MdAssignment size={24} />
            <h2 className="md:text-3xl  text-xl font-bold ">{title}</h2>
            <span className="ml-auto bg-[var(--main-color)] text-white w-6 h-6 flex items-center justify-center rounded-full text-sm">
              {tasks.length}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 ">
          {tasks.length > 0 ? (
            <div className="space-y-3">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-[var(--main-color)] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed flex-1">
                    {task.trim()}
                  </p>
                  {/* <MdKeyboardArrowRight className="text-gray-400 flex-shrink-0 mt-0.5" size={16} /> */}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No requirements specified
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
