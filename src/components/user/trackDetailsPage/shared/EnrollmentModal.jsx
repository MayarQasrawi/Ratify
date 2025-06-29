import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdClose } from "react-icons/md";
import useRegisterInTrack from "../../../../hooks/applicant/enroll/useRegisterInTrack";
import { useAuthContext } from "../../../../contexts/AuthProvider";
import Extract from "../../../../utils/Extract";
import Spinner from "../../../shared/Spinner";
import Alert from "../../../shared/Alert";
import SuccessEnroll from "../../shared/enroll/SuccessEnroll";
import Modal from "../../../shared/modal/Modal";

export default function EnrollmentModal({ setShow, title, description , trackId=9, link}) {
  const { isPending, isError, mutate:registerInTrack, isSuccess,data,error } =
    useRegisterInTrack();
  const navigate = useNavigate();
  let userId ;
  const { auth } = useAuthContext();
  if (auth) userId = Extract(auth, "nameid");
  // console.log(isError, "inside enroll,",userId );
  // console.log(trackId, "inside enroll lllllllllllllllllmmmmmmmmml");

  if(isError){
    setTimeout(()=>setShow(false),1000)
   return  <Alert type='error' message={error?.response?.data?.message || 'Error'}/>
  }
  if(isSuccess){
    return <SuccessEnroll setShow={setShow} link={link} /> 
  }
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
        <p className="text-gray-700 mt-3 px-4 ">{description}</p>
        <button
          onClick={() => {
            if (title.includes("Log")) {
              navigate("/login");
              setShow(false);
            } else {
              registerInTrack({ trackId:trackId, userId:userId })}
          }}
          disabled={isPending}
          className="w-[95%] disabled:cursor-not-allowed ml-3 mt-5 flex gap-.5 items-center justify-center font-medium cursor-pointer px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
        >
          {isPending ? <Spinner color='blue' /> :title.includes("Log") ? "Login" : title} 
        </button>
      </div>
    </>
  );
}
