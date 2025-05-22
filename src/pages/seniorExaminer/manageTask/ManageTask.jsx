import { useState } from "react";
import Title from "../../../components/admin/shared/Title";
import Search from "../../../components/admin/shared/Search";
import NoResultFound from "../../../components/shared/NoResultFound";
import TaskItem from "../../../components/seniorExaminer/manageTask/TaskItem";
import useDeleteTask from "../../../hooks/seniorExaminer/manageTask/useDeleteTask";
import Modal from "../../../components/shared/modal/Modal";
import ConfirmationModal from "../../../components/shared/modal/ConfirmationModal";

const initialTasks = [
  { id: 1, title: "Frontend Development", requirement: "Build responsive UI components using React and Tailwind CSS", description: "Create a set of reusable UI components ..." },
  { id: 2, title: "Backend API Development", requirement: "Implement RESTful API endpoints using Node.js and Express", description: "Develop API endpoints for user authentication ..." },
  { id: 3, title: "Database Optimization", requirement: "Optimize database queries and implement indexing strategies", description: "Analyze current database performance ..." },
  { id: 4, title: "Integration Testing", requirement: "Develop comprehensive integration tests for all system components", description: "Create integration tests to verify ..." },
];

export default function ManageTask() {
  const [tasks, setTasks] = useState(initialTasks);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [expandedTask, setExpandedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [selectedTask,setSelectedTask]=useState()
 const {
     mutate: deleteTask,
     isPending,
     isSuccess,
     error,
     isError,
     reset,
   } =  useDeleteTask();
  const startEdit = (task) => setEditingTaskId(task.id);
  const cancelEdit = () => setEditingTaskId(null);

  const handleDelete = (task) =>{setSelected('delete');setSelectedTask(task)}
  const toggleExpand = (id) => setExpandedTask(expandedTask === id ? null : id);

  const filtered = tasks.filter(
    (t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()) 
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
          {filtered.length > 0 ? filtered.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isEditing={editingTaskId === task.id}
              onEdit={() => startEdit(task)}
              onCancel={cancelEdit}
              onSave={(updated) => {
                setTasks((prev) => prev.map((t) => t.id === updated.id ? updated : t));
                cancelEdit();
              }}
              onDelete={handleDelete}
              expanded={expandedTask === task.id}
              onToggle={() => toggleExpand(task.id)}
            />
          )) : (
            <NoResultFound text={'task'} />
          )}
        </div>
      </div>
    </div>
    </>
  );
}








