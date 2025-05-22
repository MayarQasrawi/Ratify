import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Back from "../../../components/shared/dashboard/Back";
import Accordion from "../../../components/user/trackDetailsPage/details/Accordion";
import {
  FiChevronLeft,
  FiLayers,
  FiColumns,
  FiSave,
  FiInfo,
  FiAlertCircle,
} from "react-icons/fi";
import useAddTask from "../../../hooks/examiner/task/useAddTask";
import Spinner from "../../../components/shared/Spinner";

const criteriaOptions = [
  {
    id: "c3",
    name: "Correctness",
    description: "Bug-free solution",
    weight: 60,
  },
  {
    id: "c4",
    name: "Efficiency",
    description: "Optimal performance",
    weight: 40,
  },
];

const formFields = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Task title",
    required: "Title is required",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter task description",
    required: "Description is required",
    rows: 5,
  },
  {
    name: "requirements",
    label: "Requirements",
    type: "textarea",
    placeholder: "Enter task requirements",
    required: "Requirements is required",
    rows: 8,
  },
];

export default function CreateTask() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [layout, setLayout] = useState("Stacked");
  const { mutate:addTask,isError, isPending,isSuccess}= useAddTask()
  useEffect(() => {
    if (location.hash === "#top") {
      const anchor = document.getElementById("top");
      if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  const onSubmit = (data) => {
    console.log(data, "task added");
    addTask(data)
  };

  const ContainerClass =
    layout === "Side-by-Side"
      ? "flex flex-col lg:flex-row gap-6 p-4"
      : "flex flex-col gap-6 p-4";
  return (
    <div className="flex flex-col" id="top">
      <div className=" py-4 px-6  ">
        <div className="flex md:items-center md:justify-between flex-col md:flex-row">
          <div className="flex items-center gap-2">
            <Back
              text="Back to Stage Tasks"
              onClick={() => navigate("/dashboard/examiner/add-tasks")}
            />
          </div>
          <div className="flex items-center gap-4 mt-3 md:mt-0">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1 flex ">
              <button
                onClick={() => setLayout("Side-by-Side")}
                className={`flex cursor-pointer items-center gap-1 px-3 py-1.5 rounded-md text-sm transition-colors ${
                  layout === "Side-by-Side"
                    ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <FiColumns size={16} />
                <span>Side-by-Side</span>
              </button>
              <button
                onClick={() => setLayout("Stacked")}
                className={`flex  cursor-pointer items-center gap-1 px-3 py-1.5 rounded-md text-sm transition-colors ${
                  layout === "Stacked"
                    ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <FiLayers size={16} />
                <span>Stacked</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-7xl mx-auto w-full p-4"
      >
        <div className={ContainerClass}>
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Create New Task
              </h2>
            </div>
            <div className="p-6 space-y-6">
              {formFields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {field.icon && (
                      <span className="text-gray-400">{field.icon}</span>
                    )}
                    {field.label}
                    <span className="text-red-500">*</span>
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      {...register(
                        field.name,
                        field.required ? { required: field.required } : {}
                      )}
                      rows={field.rows || 4}
                      className={`w-full px-4 py-3 border rounded-lg outline-none transition-colors duration-200
                        ${
                          errors[field.name]
                            ? "border-red-300 dark:border-red-500  dark:bg-red-900/10"
                            : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                        }
                        text-gray-900 dark:text-gray-100 placeholder:sm placeholder-gray-400 dark:placeholder-gray-500 resize-none`}
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <input
                      type={field.type}
                      {...register(
                        field.name,
                        field.required ? { required: field.required } : {}
                      )}
                      className={`w-full px-4 py-3 border rounded-lg outline-none transition-colors duration-200
                        ${
                          errors[field.name]
                            ? "border-red-300 dark:border-red-500  dark:bg-red-900/10"
                            : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 "
                        }
                        text-gray-900 dark:text-gray-100 placeholder:sm placeholder-gray-400 dark:placeholder-gray-500`}
                      placeholder={field.placeholder}
                    />
                  )}
                  {errors[field.name] && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <FiAlertCircle className="w-3 h-3" />
                      {errors[field.name].message}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-6 py-4 flex justify-end">
              <button

                type="submit"
                disabled={isPending}
                className="flex items-center cursor-pointer gap-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                  { isPending ? <Spinner />:<FiSave size={18} />} 
                <span> Add Task</span>
              </button>
            </div>
          </div>

          <div
            className={`${
              layout === "Side-by-Side" ? "lg:w-1/3" : "w-full"
            } bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden`}
          >
            <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Evaluation Criteria
              </h2>
            </div>
            <div className="space-y-3 p-4">
              {criteriaOptions.map((c, ind) => (
                <Accordion
                  key={ind}
                  description={c.description}
                  ind={ind}
                  name={
                    <div className="flex items-center justify-between w-full">
                      <span className="text-gray-900 dark:text-gray-100 font-medium">
                        {c.name}
                      </span>
                      <span className="bg-blue-100 inline-block ml-1 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-medium px-2.5 py-1 rounded-full">
                        {c.weight}%
                      </span>
                    </div>
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
