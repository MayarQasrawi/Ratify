import React from "react";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";

export default function EnrollmentModal({ setShow ,title,description}) {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full relative  max-w-md mx-auto pb-8 bg-white shadow-lg rounded-lg overflow-hidden ">
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 cursor-pointer  right-4 text-gray-500 hover:text-red-500 transition"
        >
          <MdClose className="w-6 h-6" />
        </button>
        <div className="bg-blue-50 border-b border-gray-300 p-4">
          <h2 className="flex items-center text-[var(--main-color)] font-bold text-xl">
           
            {title}
          </h2>
        </div>
        <p className="text-gray-700 mt-3 px-4 ">
         {description}
        </p>
        <button
          onClick={() => {
          if(title.includes('Log')) { navigate("/login");setShow(false);}
            
          }}
          className="w-[95%] ml-3 mt-5 font-medium cursor-pointer px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
        >
         { title.includes('Log')?'SignIn':title}
        </button>
      </div>
    </>
  );
}
