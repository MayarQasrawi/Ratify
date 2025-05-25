import { useState } from "react";
import Title from "../../../components/admin/shared/Title";
import Search from "../../../components/admin/shared/Search";
import NoResultFound from "../../../components/shared/NoResultFound";
import TaskItem from "../../../components/seniorExaminer/manageTask/TaskItem";
import useDeleteTask from "../../../hooks/seniorExaminer/manageTask/useDeleteTask";
import Modal from "../../../components/shared/modal/Modal";
import ConfirmationModal from "../../../components/shared/modal/ConfirmationModal";
import { useLocation, useNavigate } from "react-router-dom";
import useFetchTaskPool from "../../../hooks/seniorExaminer/manageTask/useFetchTaskPool";
import useGetAllTask from "../../../hooks/seniorExaminer/manageTask/useGetAllTask";
import GeneralSpinner from "../../../components/shared/dashboard/Spinner";
import Back from "../../../components/shared/dashboard/Back";
import { FaClock } from "react-icons/fa";

const initialTasks = [
  {
    id: 1,
    title: "Frontend Development",
    requirement: "Build responsive UI components using React and Tailwind CSS",
    description: "Create a set of reusable UI components ...",
  },
  {
    id: 2,
    title: "Backend API Development",
    requirement: "Implement RESTful API endpoints using Node.js and Express",
    description: "Develop API endpoints for user authentication ...",
  },
  {
    id: 3,
    title: "Database Optimization",
    requirement: "Optimize database queries and implement indexing strategies",
    description: "Analyze current database performance ...",
  },
  {
    id: 4,
    title: "Integration Testing",
    requirement:
      "Develop comprehensive integration tests for all system components",
    description: "Create integration tests to verify ...",
  },
];

export default function ManageTask() {
  const [tasks, setTasks] = useState(initialTasks);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [expandedTask, setExpandedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [selectedTask, setSelectedTask] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    data: taskPool,
    isLoading: isTaskLoading,
    isError: isTaskError,
  } = useFetchTaskPool(location.state.stage.id);
  const {
    data: allTask,
    isLoading: isAllTasksLoading,
    isError: isAllTasksError,
  } = useGetAllTask(taskPool?.data?.id, {
    enabled: !!taskPool,
  });
  console.log(allTask, "all tak ................................");
  console.log(location?.state?.stage, "selected stage ");
  console.log("pooool", taskPool?.data?.id);
  const {
    mutate: deleteTask,
    isPending,
    isSuccess,
    error,
    isError,
    reset,
  } = useDeleteTask(taskPool?.data?.id);
  const startEdit = (task) => setEditingTaskId(task.id);
  const cancelEdit = () => setEditingTaskId(null);

  const handleDelete = (task) => {
    setSelected("delete");
    setSelectedTask(task);
  };
  const toggleExpand = (id) => setExpandedTask(expandedTask === id ? null : id);
  const filtered =
    allTask &&
    allTask.data.filter((t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(filtered,'allllllllllllllllllllllllllllllllllllllllllllllllll')
  if (isTaskLoading || isAllTasksLoading)
    return <GeneralSpinner text="Task Repo Page" />;
  if (allTask?.data?.length == 0)
    return (
      <>
        <div className="flex mb-4 items-center gap-2">
          <Back
            text="Back to Stage Tasks"
            onClick={() => navigate("/dashboard/seniorExaminer/stage-tasks")}
          />
        </div>
        <Title>Task Repository</Title>
        <div className="h-[70vh] flex items-center justify-center">
          <div className="p-8 text-center  text-gray-500 dark:text-gray-400">
            <FaClock className="mx-auto text-4xl mb-4" />
            <p className="text-lg">No Task Found in this Stage</p>
          </div>
        </div>
      </>
    );
  return (
    <>
      {selected == "delete" && (
        <Modal>
          <ConfirmationModal
            view={true}
            Cancle={() => {
              setSelected(null);
              setSelectedTask(null);
              reset();
            }}
            Confirm={() => deleteTask(selectedTask.id)}
            isPending={isPending}
            isSuccess={isSuccess}
            isError={isError}
          >
            Are you sure you want to delete {selectedTask.title} Task?
          </ConfirmationModal>
        </Modal>
      )}
      <div className="min-h-scree">
        <div className="flex items-center gap-2">
          <Back
            text="Back to Stage Tasks"
            onClick={() => navigate("/dashboard/seniorExaminer/stage-tasks")}
          />
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Title>Task Repository</Title>
          </div>
          <div className="flex items-center mb-6 space-x-4">
            <div className="w-[55%]">
              <Search search={searchQuery} setSearch={setSearchQuery} />
            </div>
          </div>
          <div className="space-y-4">
            {allTask.data.length > 0 ? (
              filtered.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  isEditing={editingTaskId === task.id}
                  onEdit={() => startEdit(task)}
                  onCancel={cancelEdit}
                  onSave={(updated) => {
                    setTasks((prev) =>
                      prev.map((t) => (t.id === updated.id ? updated : t))
                    );
                    cancelEdit();
                  }}
                  onDelete={handleDelete}
                  expanded={expandedTask === task.id}
                  onToggle={() => toggleExpand(task.id)}
                />
              ))
            ) : (
              <NoResultFound text={"task"} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
