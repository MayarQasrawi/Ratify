import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";
import Header from "./shared/Header";
import { useLocation } from "react-router-dom";

export default function TrackInput({ field }) {
  const location=useLocation();
  const [empty, setIsEmpty] = useState(()=>location?.state?false:true);
  const [value, setValue] = useState(()=>location?.state? location?.state.track[field.name]:'');
  const [update, setUpdate] = useState(()=>location?.state?true:false);
  const [error, setError] = useState("");
  field.ref.current = value;
  return (
    <div className="bg-[var(--sidebar-icon-bg)] rounded-lg p-3 text-gray-900 font-medium">
      <div className="flex justify-between items-center">
        <Header>{field.title}</Header>
        {empty && (
          <div
            onClick={() => setIsEmpty(false)}
            className="flex gap-1.5 items-center text-[10px] sm:text-[12px] text-blue-600 hover:text-blue-700 transition font-medium cursor-pointer"
          >
            <AiOutlinePlusCircle className="text-sm" />
            <span>Add {field.title}</span>
          </div>
        )}
        {update && (
          <div
            onClick={() => setUpdate(false)}
            className="flex gap-1.5 items-center text-[12px] text-blue-600 hover:text-blue-700 transition font-medium  cursor-pointer"
          >
            <FaPencilAlt className="text-sm" />
            <span>Edit {field.title}</span>
          </div>
        )}
      </div>
      {error && !empty && (
        <p className="p-4 w-[90%] pl-2 mt-4 border-l-4 border-l-red-500 bg-white text-gray-900 text-sm rounded-2xl">
          {error}
        </p>
      )}
      <div className="mt-2.5">
        {update && <p className="">{value}</p>}
        {empty && !update && (
          <p className="text-gray-600 inline-block text-[9px] sm:text-[12px]">
            No {field.title}
          </p>
        )}
        {!empty && !update && (
          <div className="flex flex-col items-start gap-2 pl-2">
            {field.textArea ? (
              <textarea
                value={value}
                className="pl-2 py-1 w-[90%] outline-none bg-white rounded-md min-h-[200px] text-sm"
                onChange={(e) => setValue(e.target.value)}
              ></textarea>
            ) : (
              <input
                value={value}
                className="py-1 pl-2 w-[90%] text-sm outline-none bg-white rounded-md border border-gray-300"
                onChange={(e) => setValue(e.target.value)}
              />
            )}
            <div className="flex gap-5 mt-2">
              {" "}
              <button
                onClick={() => {
                  if (value == "") {
                    setError("This field is requried");
                    return;
                  }
                  if(value.length>500){
                    setError("Character limit exceeded 500 characters");
                    return;
                  }
                  setError("");
                  if (!empty && value) setUpdate(true);
                }} 
                
                className="block cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-sm"
              >
                Save
              </button>
             {!location?.state &&<button
                onClick={() => {
                  setUpdate(false);
                  setIsEmpty(true);
                }}
                className="block cursor-pointer bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-sm"
              >
                Cancel
              </button>}     
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
