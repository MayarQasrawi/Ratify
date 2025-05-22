import React, { useState,useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import useGetTraksList from "../../../hooks/Admin/tracks/useGetTraksList";

const options = [
  { id: 1, value: "Abrar" },
  { id: 2, value: "Abr" },
  { id: 3, value: "Abrar" },
];
export default function Select({workingTrackId}) {
  const {data:tracks,isLoading,isError}= useGetTraksList()
    console.log(tracks?.data,'inside add moda')
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(()=>{
   if(selectedId)
      workingTrackId.current=selectedId
  },[selectedId])
  console.log( workingTrackId,'inside select hhhh',selectedId)
  return (
    <div className=" text-gray-900  font-medium">
      <div className="mt-3 relative border border-[var(--input-border)] rounded-lg" >
        <div
          className="w-full text-xs text-[var(--text-color)] p-2 h-12  rounded-lg flex justify-between items-center cursor-pointer"
          onClick={()=>setIsOpen(!isOpen)}
        >
          <span
          >
            {selectedOption ? selectedOption : "Assign Examiner to Track"}
          </span>
          <FiChevronDown />
        </div>

        {isOpen && (
          <div className="absolute -mt-.5  text-sm text-gray-900 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            {tracks?.data.map((option) => (
              <div
                key={option.id}
                className='p-2 cursor-pointer hover:bg-gray-50 text-gray-900'
                onClick={() =>{setSelectedOption(option.name);setIsOpen(false);setSelectedId(option.id)}}
              >
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
