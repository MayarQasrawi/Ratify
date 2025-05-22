import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Header from "./shared/Header";
import CancelButton from "./shared/CancelButton";
import useAddWorkload from "../../../hooks/seniorExaminer/workloads/useAddWorkload";
import Spinner from "../../shared/Spinner";
import Alert from "../../shared/Alert";

const workloadTypes = ["task", "exam", "interview"];

export default function AddWorkload({ onClose, member }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 const { isError, error,isPending, mutate:addWorkLoad,isSuccess,data } =useAddWorkload();
 useEffect(()=>{
  if(isSuccess ||isError )
  setTimeout(()=>onClose(),1500)
 },[isSuccess,isError])
  const onSubmit = (data) => {
    console.log(data,'add workload');
    addWorkLoad({examinerID:member.id,examinerLoads:[...data]})
  };
  const onFormSubmit = (data) => {
    const payload = workloadTypes.map((type) => ({
      type,
      maxWorkLoad: Number(data[`${type}Max`]),
    }));
    onSubmit(payload);
  };

  return (
    <>
     {isError && <Alert type='error' message='Failed to update workload. Please try again' />}
     {isSuccess && <Alert  message='suc'/>}
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="max-w-md w-full pb-6 bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <Header>Add {member.fullName.split(" ")[0]} Workloads</Header>
      {workloadTypes.map((type) => (
        <div key={type} className="mb-4 px-4 mt-6">
          <div className="font-medium capitalize mb-1">
            {type}
            <span className="text-red-500">*</span>
          </div>
          <div className="flex space-x-2">
            <div className="flex-1">
              <input
                type="number"
                min="0"
                {...register(`${type}Max`, { required: true })}
                className={`w-full border outline-none rounded px-3 py-2 placeholder:text-sm ${
                  errors[`${type}Max`] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[`${type}Max`] && (
                <span className="text-red-500 text-xs">
                  This Field Required
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-end gap-2 pr-3">
       {!isPending && <CancelButton onClose={onClose} />} 
        <button
          disabled={isPending}
          type="submit"
          className=" bg-blue-500 hover:bg-blue-600 disabled:cursor-not-allowed flex items-center gap-1 text-white rounded px-4 py-2 cursor-pointer"
        >
        {isPending && <Spinner />}  Add Workloads
        </button>
      </div>
    </form>
    </>
  );
}
