import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import AssignmentModal from "./AssignmentModal";

export default function AssignmentType({ onClose, stages, examiner, id }) {
  console.log(stages, examiner, id, "inside assignment type moda");
  const [selectedType, setSelectedType] = useState("");

  console.log(selectedType, 'selectedType',stages.task)
  if (selectedType)  return   <AssignmentModal
            onClose={onClose}
            examiner={examiner}
            stages={selectedType=='Task'?stages.task:stages.exam}
            id={id}
          /> 

  ;
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-y-auto">
      <header className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Create Assignment
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 cursor-pointer dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          <MdClose className="w-6 h-6" />
        </button>
      </header>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Select which Type of Creation Assignment:
      </p>
      <form>
        <div className="space-y-4 mb-6">
          <label className="flex items-center cursor-pointer  p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <input
              type="radio"
              name="approveScope"
              value="Task"
              onChange={() => setSelectedType("Task")}
              className="form-radio text-blue-600 h-5 w-5"
            />
            <div className="ml-3">
              <p className="font-medium text-gray-900 dark:text-gray-100">
                Task
              </p>
            </div>
          </label>

          <label className="flex items-center p-4 border cursor-pointer border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <input
              type="radio"
              name="Exam"
              value="all"
              onChange={() => setSelectedType("Exam")}
              className="form-radio text-green-600 h-5 w-5"
            />
            <div className="ml-3">
              <p className="font-medium text-gray-900 dark:text-gray-100">
                Exam
              </p>
            </div>
          </label>
        </div>
        {selectedType && (
          <div className="flex justify-end">
            <button
              type="button"
              className=" bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {selectedType === "Task" ? "Assign Task" : "Assign Exam"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
