import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Title from "./shared/Title";
import { AiOutlineClose } from "react-icons/ai";
import { FiAlertCircle } from "react-icons/fi";
import Spinner from "../../../shared/Spinner";

const fieldConfigs = {
  Task: [
    {
      name: "daysToSubmit",
      label: "Days To Submit",
      type: "number",
      validation: {
        required: "Required",
        min: { value: 1, message: "Must be at least 1" },
      },
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      validation: { required: "Required" },
    },
    {
      name: "requirements",
      label: "Requirements",
      type: "textarea",
      validation: { required: "Required" },
    },
  ],
  Interview: [
    {
      name: "maxDaysToBook",
      label: "Max Days To Book",
      type: "number",
      validation: {
        required: "Required",
        min: { value: 0, message: "Cannot be negative" },
      },
    },
    {
      name: "durationMinutes",
      label: "Duration (Minutes)",
      type: "number",
      validation: {
        required: "Required",
        min: { value: 1, message: "Must be positive" },
      },
    },
    {
      name: "instructions",
      label: "Instructions",
      type: "textarea",
      validation: { required: "Required" },
    },
  ],
  Exam: [
    {
      name: "difficulty",
      label: "Difficulty",
      type: "select",
      options: ["Easy", "Medium", "Hard"],
      validation: { required: "Required" },
    },
    {
      name: "questionsType",
      label: "Question Types",
      type: "multiselect",
      options: ["MultipleChoice", "Essay", "Coding", "TrueFalse"],
      validation: { required: "Select at least one" },
    },
    {
      name: "durationMinutes",
      label: "Duration (Minutes)",
      type: "number",
      validation: {
        required: "Required",
        min: { value: 1, message: "Must be positive" },
      },
    },
  ],
};

export default function EditStageDetailsModal({
  editType,
  onClose,
  itemToEdit,
  setItemToEdit,
  onUpdate,
  isPending,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset(itemToEdit || {});
  }, [itemToEdit, reset]);

  const onSubmit =async (data,e) => {
   e.preventDefault()
    const { type, ...rest } = data;
    console.log(rest, "update stage details...");
    await onUpdate(data,type);
  };
  const fields = fieldConfigs[editType] || [];
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg p-6">
      <header className="flex justify-between items-center">
        <Title> Edit {editType} Details</Title>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-red-500 transition-colors  "
        >
          <AiOutlineClose size={20} className="cursor-pointer" />
        </button>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <div className="my-4 " key={field.name}>
            <label className="block text-sm font-medium text-gray-700 dark:text-black/70 mb-1.5">
              {field.label}
              <span className="text-red-500  dark:text-red-700">*</span>
            </label>

            {field.type === "textarea" && (
              <textarea
                className="block w-full border border-gray-300 rounded-md  p-3 outline-none dark:border-gray-700 dark:bg-gray-800 dark:bg-opacity-90 "
                {...register(field.name, field.validation)}
              />
            )}

            {field.type === "number" && (
              <input
                type="number"
                className="block w-full border border-gray-300 rounded-md  p-3 outline-none dark:border-gray-700 dark:bg-gray-800 dark:bg-opacity-90 "
                {...register(field.name, field.validation)}
              />
            )}
            {field.type === "select" && (
              <select
                className="w-full border  outline-none border-gray-300  rounded-md  p-3  dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                {...register(field.name, field.validation)}
              >
                <option value="" hidden>
                  Select...
                </option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {field.type === "multiselect" && (
              <select
                multiple
                className="w-full  border  border-gray-300   p-3 outline-none rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                {...register(field.name, field.validation)}
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {errors[field.name] && (
              <div className="flex items-center gap-1 text-red-500 m-0 p-0">
                <FiAlertCircle className="w-4 h-4" />
                <p className=" text-xs mt-1">{errors[field.name]?.message}</p>
              </div>
            )}
          </div>
        ))}
        <div className="mt-6 flex justify-end space-x-3">
          {!isPending && (
            <button
              onClick={onClose}
              className="cursor-pointer px-4 py-2 border dark:border-gray-700  border-gray-300 rounded-md dark:text-white text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            disabled={isPending}
            className="cursor-pointer disabled:cursor-not-allowed flex items-center gap-0.5 px-4 py-2 bg-blue-500 dark:bg-blue-700  text-white rounded-md hover:bg-blue-600 transition-colors "
          >
            {isPending && <Spinner />} Update
          </button>
        </div>
      </form>
    </div>
  );
}
