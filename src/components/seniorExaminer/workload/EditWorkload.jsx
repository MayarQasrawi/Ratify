import React, { useEffect, useState } from "react";
import Header from "./shared/Header";
import CancelButton from "./shared/CancelButton";
import useUpdateWorkload from "../../../hooks/seniorExaminer/workloads/useUpdateWorkload";
import Spinner from "../../shared/Spinner";
import Alert from "../../shared/Alert";

export default function EditWorkload({ workload, onClose }) {
  console.log()
  const [maxWorkLoad,setMaxWorkLoad] =useState(workload.maxWorkLoad);
  const { isError, error,isPending, mutate:updateWorkload,isSuccess,data } = useUpdateWorkload();
  const handleEditWorkload=()=>{
    console.log({maxWorkLoad:maxWorkLoad,id:workload.id})
    updateWorkload({maxWorkLoad:maxWorkLoad,id:workload.id})
  }
  useEffect(()=>{
   if(isError || isSuccess)
    setTimeout(()=>onClose(),1500)
  },[isError,isSuccess])
 
  return (
    <>
     {isError && <Alert message='Failed to update workload. Please try again' type='error' /> }
     {isSuccess && <Alert message='Workload updated successfully'  /> }
    <div className="max-w-md w-full pb-6 bg-white rounded-lg shadow-lg overflow-hidden">
      <Header>
        Edit <span className="capitalize">{workload.type}</span> Workload
      </Header>
      <div className="px-3 mt-4 ">
        <div className="font-medium capitalize mb-1">
          {workload.type}
          <span className="text-red-500">*</span>
          <input
                type="number"
                min="0"
                value={maxWorkLoad}
                onChange={(e)=>setMaxWorkLoad(Number(e.target.value))}
                className={`w-full mt-2 border outline-none rounded px-3 py-2 placeholder:text-sm border-gray-300`}
              />
        </div>
        <div className="flex justify-end gap-2 pr-3 mt-4">
         {!isPending && <CancelButton onClose={onClose} />} 
          <button
            onClick={handleEditWorkload}
            disabled={isPending}
            className=" bg-blue-500 hover:bg-blue-600 flex items-center disabled:cursor-not-allowed gap-2 text-white rounded px-4 py-2 cursor-pointer"
          >
           {isPending && <Spinner />} Edit <span className="capitalize">{workload.type}</span> 
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
