import { useForm } from "react-hook-form";
import {
  FaCalendarAlt,
  FaFileAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { MdClose } from "react-icons/md";
import useApproveRequest from "../../../hooks/seniorExaminer/examRequest/useApproveRequest";
import Spinner from "../../shared/Spinner";
import useApproveAllRequest from "../../../hooks/seniorExaminer/examRequest/useApproveAllRequest";
import { useEffect } from "react";
import Alert from "../../shared/Alert";

export default function ExamModal({ cancelAction, selectedRequest,all=false }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    isError,
    error,
    isPending,
    mutate: approveRequest,
    isSuccess,
    data,
  } = useApproveRequest();
   const {
    isError:isApproveAllError,
    isPending:isApproveAllPending,
    mutate: approveAllRequest,
    isSuccess:isApproveAllSuccess,
  } = useApproveAllRequest();
  console.log(selectedRequest,'llllllllllllllllllllllllllllllllllllllll')
  const onSubmit = (data) => {
    console.log(data, selectedRequest.id);
    if(all){
      console.log({...data,requestIds:selectedRequest},'all')
      approveAllRequest({...data,requestIds:selectedRequest})
    }
    else{
       approveRequest({ ...data, id: selectedRequest.id });
    }
  };
  useEffect(()=>{
   if(isError || isSuccess)
    setTimeout(()=>cancelAction(),1500)
  },[isError,isSuccess])
  return (
    <>
     {(isError || isApproveAllError) && <Alert message='Request Failed  Please try again' type='error' /> }
     {(isSuccess || isApproveAllSuccess) && <Alert message='Approve successfully'  /> }
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-y-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[var(--main-color)] dark:text-gray-100">
            Schedule Exam
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
            <FaCalendarAlt className="w-4 h-4" />
            Scheduled Date &amp; Time <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            {...register("scheduledDate", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 foutline-none transition-colors"
          />
          {errors.scheduledDateTime && (
            <p className="text-sm text-red-500 mt-1">This field is required.</p>
          )}
        </div>

        <div>
          <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <FaFileAlt className="w-4 h-4" />
            Exam Instructions <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("instructions", { required: true })}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100  outline-none transition-colors resize-vertical placeholder:text-sm"
            placeholder="Enter detailed instructions for the exam (requirements, rules, etc.)"
          />
          {errors.instructions && (
            <p className="text-sm text-red-500 mt-1">This field is required.</p>
          )}
        </div>
        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {(!isPending ||  !isApproveAllPending) && (
            <button
              type="button"
              onClick={cancelAction}
              className="px-6 py-2 text-gray-700 cursor-pointer dark:text-gray-200 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-lg font-medium transition-colors duration-200"
            >
              Cancel
            </button>
          )}
          <button
            disabled={(isPending|| isApproveAllPending)}
            type="submit"
            className="px-6 py-2 disabled:cursor-not-allowed bg-blue-600 cursor-pointer dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            {(isPending || isApproveAllPending) ? <Spinner /> : <FaCheckCircle />}
            Approve
          </button>
        </div>
      </form>
    </div>
    </>
  );
}
