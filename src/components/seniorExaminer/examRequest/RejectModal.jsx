import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import useRejectRequest from "../../../hooks/seniorExaminer/examRequest/useRejectRequest";
import { FaCheckCircle } from "react-icons/fa";

export default function RejectModal({ selectedRequest, cancelAction }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    isError: isRejectError,
    isPending: isRejectPending,
    mutate: rejectRequest,
    isSuccess: isRejectSuccess,
  } = useRejectRequest();
  console.log("inside reject modal", selectedRequest);
  const onSubmit = (data) => {
    console.log(data, "form reject");
     rejectRequest({...data,id:selectedRequest.id})
  };
  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-y-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[var(--main-color)] dark:text-gray-100">
            Reject Exam Request
          </h2>
          <button
            type="button"
            onClick={cancelAction}
            className="text-gray-600 cursor-pointer  dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            <MdClose className="w-6 h-6" />
          </button>
        </header>
        <div>
          <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            Reason <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("reason", { required: true })}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100  outline-none transition-colors resize-vertical "
          />
          {errors.reason && (
            <p className="text-sm text-red-500 mt-1">This field is required.</p>
          )}
        </div>
        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {!isRejectPending && (
            <button
              type="button"
              onClick={cancelAction}
              className="px-6 py-2 text-gray-700 cursor-pointer dark:text-gray-200 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-lg font-medium transition-colors duration-200"
            >
              Cancel
            </button>
          )}
          <button
            disabled={isRejectPending}
            type="submit"
            className="px-6 py-2 disabled:cursor-not-allowed bg-blue-600 cursor-pointer dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            {isRejectPending ? <Spinner /> : <FaCheckCircle />}
            Reject
          </button>
        </div>
      </form>
    </div>
  );
}
