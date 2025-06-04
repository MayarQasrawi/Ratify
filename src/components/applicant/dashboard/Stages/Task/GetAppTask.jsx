import useGetAssignRandomTask from "@/hooks/applicant/task/useGetAssignRandomTask";
import useGetTaskInfo from "@/hooks/applicant/task/useGetTaskInfo";
import { useEffect, useState } from "react";
import TaskInfo from './TaskInfo';
import Error from "@/components/admin/shared/Error";
import Loading from "@/components/admin/shared/Loading";

function GetAppTask({ stageProgressId, taskId, dueDate: propDueDate, assignedDate: propAssignedDate, bool = false }) {
  const [assignedTask, setAssignedTask] = useState(null);

  const { mutate: assignRandomTask, isLoading: isAssigning } =
    useGetAssignRandomTask({
      onSuccess: (data) => {
        console.log("Task assigned successfully:", data);
        setAssignedTask(data.data);
      },
      onError: (error) => {
        console.error("Error assigning task:", error);
      },
    });

  useEffect(() => {
    if (!taskId && bool) {
      assignRandomTask(stageProgressId);
    }
  }, [taskId]);

  const id = taskId || assignedTask?.taskId;

  const {
    data: taskInfo,
    isLoading: isTaskLoading,
    isError: isTaskError,
  } = useGetTaskInfo(id);

  const finalAssignedDate = propAssignedDate || assignedTask?.assignedDate;
  const finalDueDate = propDueDate || assignedTask?.dueDate;

  if (isAssigning || isTaskLoading || !taskInfo) {
    return (
     <div className="animate-pulse space-y-6">
        <div className="flex gap-4">
          <div className="h-6 w-40 bg-gray-300/50 rounded-xl" />
          <div className="h-6 w-40 bg-gray-300/50 rounded-xl" />
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="h-64 bg-gray-300/50 rounded-lg" />
          <div className="h-64 bg-gray-300/50 rounded-lg" />
        </div>
      </div>
    );
  }

  if (isTaskError) {
    return (
      <Error />
    );
  }

  return (
    <div>
      <TaskInfo
        assignedDate={finalAssignedDate}
        dueDate={finalDueDate}
        taskInfo={taskInfo}
      />
    </div>
  );
}

export default GetAppTask;
