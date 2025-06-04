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
    return <p className="text-center text-gray-600/10 rounded-lg py-10 px-5 ">No task assigned yet.</p>;
  }

  const { title, description, requirements, difficulty } = taskInfo;

  return (
    <div>
      <div className="flex text-center justify-start md:gap-10 gap-2 mb-5">
        {[assignedDate, dueDate].map((date, index) => (
          date? <div
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
          </div> :<></>
          
        ))}
      </div>

      <div className="flex-col space-y-4 lg:grid lg:grid-cols-2 gap-4 items-center justify-center text-[var(--text-color)]">
        <div>
          <TaskTable
            dueDate={dueDate}
            difficulty={difficulty}
            requirements={requirements}
            title={title}
          />
        </div>
        <div className="flex flex-col gap-4 h-full bg-gray-600/5 p-5 items-center justify-center rounded-lg">
          <h1 className="font-bold text-2xl text-[var(--main-color)]">Description</h1>
          <p className="font-normal text-lg text-center">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskInfo;
