import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Header from "./shared/Header";
import CancelButton from "./shared/CancelButton";
import useAddWorkload from "../../../hooks/seniorExaminer/workloads/useAddWorkload";
import Spinner from "../../shared/Spinner";
import Alert from "../../shared/Alert";

export default function AddWorkload({ onClose, member }) {
  const [selectedTypes, setSelectedTypes] = useState({
    task: { selected: false, count: 1 },
    exam: { selected: false, count: 1 },
    interview: { selected: false, count: 1 },
    examCreation:{ selected: false, count: 1 },
    taskCreation:{ selected: false, count: 1 },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    unregister,
  } = useForm();

  const {
    isError,
    error,
    isPending,
    mutate: addWorkLoad,
    isSuccess,
    data,
  } = useAddWorkload();

  useEffect(() => {
    if (isSuccess || isError) {
      setTimeout(() => onClose(), 1500);
    }
  }, [isSuccess, isError, onClose]);

  const toggleType = (type) => {
    setSelectedTypes((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        selected: !prev[type].selected,
      },
    }));

    if (selectedTypes[type].selected) {
      for (let i = 1; i <= selectedTypes[type].count; i++) {
        unregister(`${type}_${i}Max`);
      }
    }
  };

  const onFormSubmit = (data) => {
    const payload = [];
    Object.keys(selectedTypes).forEach((type) => {
      if (selectedTypes[type].selected) {
        for (let i = 1; i <= selectedTypes[type].count; i++) {
          const value = data[`${type}_${i}Max`];
          if (value && Number(value) > 0) {
            payload.push({
              type: type,
              subType:
                selectedTypes[type].count > 1 ? `${type} ${i}` : undefined,
              maxWorkLoad: Number(value),
            });
          }
        }
      }
    });

    if (payload.length === 0) {
      
      return;
    }

    console.log(payload, "add workload");
    addWorkLoad({ examinerID: member.id, examinerLoads: payload });
  };

  const validateTaskMin = (value) => {
    const numValue = Number(value);
    if (numValue < 1) {
      return "Task workload must be at least 1";
    }
    return true;
  };

  console.log(data, "response data");

  return (
    <>
      {isError && (
        <Alert
          type="error"
          message="Failed to update workload. Please try again"
        />
      )}
      {isSuccess && (
        <Alert message={data?.message || "Workload updated successfully"} />
      )}

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="max-w-md w-full pb-6 bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <Header>Add {member.fullName.split(" ")[0]} Workloads</Header>

        <div className="px-4 mt-6">
          {Object.keys(selectedTypes).map((type) => (
            <div key={type} className="mb-4 p-3 border border-gray-200 rounded">
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTypes[type].selected}
                    onChange={() => toggleType(type)}
                    className="mr-2"
                  />
                  <span className="text-sm font-mono font-medium capitalize">{type=='task' ||type=='exam' || type=='interview'?`Number of ${type} stages supervised`:`Number of ${type} assigned ` }</span>
                </label>
              </div>

              {selectedTypes[type].selected && (
                <div className="space-y-2">
                  {Array.from(
                    { length: selectedTypes[type].count },
                    (_, index) => {
                      const fieldName = `${type}_${index + 1}Max`;
                      const isTask = type === "task";

                      return (
                        <div key={index}>
                          <input
                            type="number"
                            min={1}
                            placeholder={isTask ? "Minimum 1" : "Enter amount"}
                            {...register(fieldName, {
                              required: isTask
                                ? "Task workload is required"
                                : false,
                              validate: isTask ? validateTaskMin : undefined,
                            })}
                            className={`w-full border placeholder:text-sm rounded px-3 py-2 outline-none ${
                              errors[fieldName]
                                ? "border-red-500"
                                : "border-gray-300 focus:border-blue-500"
                            }`}
                          />
                          {errors[fieldName] && (
                            <span className="text-red-500 text-xs">
                              {errors[fieldName].message}
                            </span>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 pr-3">
          {!isPending && <CancelButton onClose={onClose} />}
          <button
            disabled={isPending}
            type="submit"
            className="bg-blue-500 cursor-pointer hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-1 text-white rounded px-4 py-2"
          >
            {isPending && <Spinner />}
            Add Workloads
          </button>
        </div>
      </form>
    </>
  );
}
