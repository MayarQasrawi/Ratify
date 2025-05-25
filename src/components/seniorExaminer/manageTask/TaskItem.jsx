import { AiOutlineBook, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import UpdateTaskForm from "./UpdateTaskForm";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function TaskItem({
  task,
  isEditing,
  onEdit,
  onCancel,
  onDelete,
  expanded,
  onToggle,
}) {
  console.log("task inside task item", task);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border-l-4 border-blue-400 dark:border-blue-700 hover:shadow-md transition">
      {isEditing ? (
        <UpdateTaskForm task={task} onCancel={onCancel} />
      ) : (
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {task.title}
                </h3>
                <span
                  className={`px-4 py-1.5 rounded-full text-sm cursor-pointer font-medium
      ${
        task.difficulty === "Easy"
          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
          : ""
      }
      ${
        task.difficulty === "Medium"
          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          : ""
      }
      ${
        task.difficulty === "Hard"
          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          : ""
      }
    `}
                >
                  {task.difficulty}
                </span>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mt-2 text-md">
                {task.requirements}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={onToggle}
                className="p-2 cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                {expanded ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              <button
                onClick={onEdit}
                className="p-2 cursor-pointer text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:text-blue-700 rounded"
              >
                <AiOutlineEdit />
              </button>
              <button
                onClick={() => onDelete(task)}
                className="p-2 cursor-pointer text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:text-red-700 rounded"
              >
                <AiOutlineDelete />
              </button>
            </div>
          </div>
          {expanded && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-r from-blue-50 dark:from-gray-700 to-indigo-50 dark:to-gray-800 p-6 rounded-xl">
                <h4 className="flex items-center text-lg font-medium text-gray-900 dark:text-white mb-2">
                  <AiOutlineBook className="mr-2 text-blue-600" /> Description
                </h4>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {task.description}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
