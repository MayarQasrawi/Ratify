import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import useCreateAssignment from "../../../hooks/seniorExaminer/createAssignment/useCreateAssignment";
import Spinner from "../../shared/Spinner";
import Alert from "../../shared/Alert";

export default function AssignmentModal({ examiner, onClose, stages, id }) {
  console.log(stages, id,examiner);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      examinerId: "",
      stageId: "",
      dueDate: "",
      notes: "",
    },
  });
  const {
    isError: isAssignError,
    isPending: isAssignPending,
    mutate,
    isSuccess,
    data,
  } = useCreateAssignment();
  const formFields = [
    {
      name: "examinerId",
      label: "Examiner",
      type: "select",
      required: true,
      placeholder: "Choose examiner ...",
      options: examiner.map((examiner) => ({
        value: examiner.id,
        label: `${examiner.fullName} `,
      })),
    },
    {
      name: "stageId",
      label: "Stage",
      type: "select",
      required: true,
      placeholder: "Choose stage ...",
      options: stages.map((stage) => ({
        value: stage.id,
        label: `${stage.name} (${stage.type})`,
      })),
    },
    {
      name: "dueDate",
      label: "Due Date",
      type: "datetime-local",
      required: true,
    },
    {
      name: "notes",
      label: "Notes",
      type: "textarea",
      required: true,
      rows: 4,
    },
  ];
  const onFormSubmit = async (data) => {
    console.log(stages[0].type);
    console.log(
      { ...data, type: stages[0].type, assignedBySeniorId: id },
      "inside assign modal llllllllllllllllllllllll"
    );
    mutate( { ...data, type: stages[0].type, assignedBySeniorId: id })
  };

  const renderField = (field) => (
    <div key={field.name}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {field.label}{" "}
        {field.required && <span className="text-red-500">*</span>}
      </label>
      {field.type === "select" ? (
        <select
          {...register(field.name, {
            required: field.required ? `${field.label} is required` : false,
          })}
          className={`w-full border rounded px-3 py-2 outline-none ${
            errors[field.name] ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="" hidden>
            {field.placeholder}
          </option>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea
          {...register(field.name, {
            required: field.required ? `${field.label} is required` : false,
          })}
          rows={field.rows}
          className={`w-full border rounded px-3 py-2 focus:outline-none placeholder:text-sm focus:border-blue-500 ${
            errors[field.name] ? "border-red-500" : "border-gray-300"
          }`}
        />
      ) : (
        <input
          type={field.type}
          {...register(field.name, {
            required: field.required ? `${field.label} is required` : false,
          })}
          placeholder={field.placeholder}
          className={`w-full p-2 border placeholder:text-sm border-[var(--input-border)] rounded-lg outline-none  focus:border-[var(--input-focus)]  transition duration-300 ease-in-out ${
            errors[field.name] ? "border-red-500" : "border-gray-300"
          }`}
        />
      )}
      {errors[field.name] && (
        <p className="text-red-500 text-xs mt-1">
          {errors[field.name].message}
        </p>
      )}
    </div>
  );
 useEffect(()=>{
  if(isAssignError || isSuccess)
  setTimeout(()=> onClose(),1500)
 },[isAssignError,isSuccess])
 console.log( data,'assign modal data')
  return (
    <>
     {isAssignError && <Alert message='Request Failed  Please try again' type='error' /> }
      {isSuccess  && <Alert message={data.data.message} /> }
     <div className="bg-white rounded-lg w-full max-w-md p-6">
      <div className="flex justify-between items-center mb-7">
        <h3 className="text-[20px] font-semibold text-gray-900">
          New Assignment
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
          type="button"
        >
          <FiX size={20} />
        </button>
      </div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="space-y-4">{formFields.map(renderField)}</div>
        <div className="flex justify-end gap-4 pt-4  dark:border-gray-700">
          {!isAssignPending && (
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 cursor-pointer dark:text-gray-200 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-lg font-medium transition-colors duration-200"
            >
              Cancel
            </button>
          )}
          <button
            disabled={isAssignPending}
            type="submit"
            className="px-6 py-2 disabled:cursor-not-allowed bg-blue-500 cursor-pointer dark:bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            {isAssignPending && <Spinner />}
            Assign
          </button>
        </div>
      </form>
    </div>
    </>
  );
}
