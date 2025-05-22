import React, { useState } from "react";
import Spinner from "../../../shared/Spinner";
import { AiOutlineClose } from "react-icons/ai";
import Title from "./shared/Title";

export default function EditPlanModal({
  editType,
  onClose,
  itemToEdit,
  setItemToEdit,
  onUpdate,
  isPending,
}) {
  const [error, setError] = useState("");

  return (
    <div className="bg-[var(--sidebar-bg)] dark:border-gray-700 p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-100">
      <div className="flex justify-between items-center mb-6">
      <Title>
          {editType === "level"
            ? "Edit Level"
            : editType === "stage"
            ? "Edit Stage"
            : "Edit Criteria"}
      </Title>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-red-500 transition-colors  "
        >
          <AiOutlineClose size={20} className="cursor-pointer" />
        </button>
      </div>

      {editType === "level" && itemToEdit && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-black/70 mb-1.5">
              Name <span className="text-red-500  dark:text-red-700">*</span>
            </label>
            <input
              type="text"
              className="block w-full border border-gray-300 rounded-md  p-3 outline-none dark:border-gray-700 dark:bg-gray-800 dark:bg-opacity-90 "
              value={itemToEdit.name}
              onChange={(e) =>
                setItemToEdit({ ...itemToEdit, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-black/70 mb-1.5">
              Description{" "}
              <span className="text-red-500  dark:text-red-700">*</span>
            </label>
            <textarea
              className="block w-full border border-gray-300 rounded-md outline-none p-3 dark:border-gray-700 dark:bg-gray-800 dark:bg-opacity-90"
              value={itemToEdit.description}
              rows={3}
              onChange={(e) =>
                setItemToEdit({
                  ...itemToEdit,
                  description: e.target.value,
                })
              }
            />
          </div>
        </div>
      )}

      {editType === "stage" && itemToEdit && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-black/70 mb-1.5">
              Description{" "}
              <span className="text-red-500  dark:text-red-700">*</span>
            </label>
            <textarea
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md  p-3 outline-none dark:border-gray-700 dark:bg-gray-800 dark:bg-opacity-90"
              value={itemToEdit.description}
              onChange={(e) =>
                setItemToEdit({
                  ...itemToEdit,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 dark:text-black/70">
              Passing Score <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min={0}
              max={100}
              className="w-full p-3 border border-gray-300 rounded-md  outline-none dark:border-gray-700 dark:bg-gray-800 dark:bg-opacity-90 "
              value={itemToEdit.passingScore}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value > 100) {
                  setError("Score must be 100 or less");
                  setItemToEdit({ ...itemToEdit, PassingScore: 0 });
                } else {
                  setError("");
                  setItemToEdit({ ...itemToEdit, passingScore: value });
                }
              }}
            />
            <p className="text-red-500 mt-1 text-xs">{error}</p>
          </div>
        </div>
      )}
      {editType === "criteria" && itemToEdit && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-black/70 mb-1.5">
              Name <span className="text-red-500  dark:text-red-700">*</span>
            </label>
            <input
              type="text"
              className=" block w-full border border-gray-300 rounded-md  p-3 outline-none dark:border-gray-700 dark:bg-gray-800 dark:bg-opacity-90 "
              value={itemToEdit.name}
              onChange={(e) =>
                setItemToEdit({ ...itemToEdit, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 dark:text-black/70">
              Description{" "}
              <span className="text-red-500 dark:text-red-700">*</span>
            </label>
            <textarea
              rows={3}
              className="block w-full border border-gray-300 rounded-md   p-3 outline-none dark:border-gray-700 dark:bg-gray-800 dark:bg-opacity-90 "
              value={itemToEdit.description}
              onChange={(e) =>
                setItemToEdit({
                  ...itemToEdit,
                  description: e.target.value,
                })
              }
            />
          </div>
        </div>
      )}
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
          onClick={onUpdate}
          disabled={isPending}
          className="cursor-pointer disabled:cursor-not-allowed flex items-center gap-0.5 px-4 py-2 bg-blue-500 dark:bg-blue-700  text-white rounded-md hover:bg-blue-600 transition-colors "
        >
          {isPending && <Spinner />} Update
        </button>
      </div>
    </div>
  );
}
