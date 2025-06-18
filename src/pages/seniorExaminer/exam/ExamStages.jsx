import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  FaFileAlt,
  FaHourglassHalf,
  FaExclamationCircle,
  FaChevronRight,
  FaClock,
} from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import Spinner from "../../../components/shared/dashboard/Spinner";
import Title from "../../../components/admin/shared/Title";
import useGetExamStages from "../../../hooks/seniorExaminer/examRequest/useGetExamStages";
import { useAuthContext } from "../../../contexts/AuthProvider";
import useFetchExaminerById from "../../../hooks/examiner/useFetchExaminerById";
import Extract from "../../../utils/Extract";
export default function ExamStages() {
  const { auth } = useAuthContext();
  const [selectedStage, setSelectedStage] = useState();

  const navigate = useNavigate();
  let role;
  let id;
  let isExaminer = false;
  if (auth) {
    id = Extract(auth, "nameid");
    role = Extract(auth, "role");
    isExaminer = role === "Examiner" || role === "SeniorExaminer";
  }
  const { data: examinerInfo } = useFetchExaminerById(id, isExaminer);
  console.log(examinerInfo);
  const {
    data: examStagess,
    isLoading,
    isError: isStageError,
  } = useGetExamStages(examinerInfo.data.workingTracks[0].id);

  console.log(
    examStagess?.data?.stages,
    ";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;exam stages"
  );
 

  if (isLoading) return <Spinner text="Exam Stage Page" />;
  if (examStagess?.data?.stages.length == 0)
    return (
      <>
        <Title>Exam Stages</Title>
        <div className="h-[60vh] flex items-center justify-center">
        <div className="p-8 text-center  text-gray-500 dark:text-gray-400">
          <FaClock className="mx-auto text-4xl mb-4" />
          <p className="text-lg">No exam Stage found </p>
        </div>
        </div>
      </>
    );
  if (isStageError) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <FaExclamationCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Error Loading Data
          </h2>
        </div>
      </div>
    );
  }

  const totalStages = examStagess?.data?.stages?.length;
  const totalPending = examStagess?.data?.stages.reduce(
    (sum, s) => sum + s.pendingRequestsCount,
    0
  );
  console.log(selectedStage, "inside exam stage task ");
  return (
    <div className="min-h-screen p-2 sm:p-6" id="top">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6 sm:mb-10 flex justify-between">
          <Title>Exam Stages</Title>
          {selectedStage && (
            <button
              onClick={() =>
                navigate("/dashboard/seniorExaminer/exams-request", {
                  state: { stage: selectedStage },
                })
              }
              className=" rounded-lg cursor-pointer text-sm font-mono bg-[var(--main-color)] text-white font-bold  text-center px-4 py-2 hover:bg-[#003F7DDE] transition duration-300 "
            >
              View Pending Request
            </button>
          )}
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10">
          <div className="flex items-center bg-white cursor-pointer dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <div className="bg-blue-600 text-white p-3 rounded-full mr-4">
              <FaFileAlt className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Stages
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {totalStages}
              </p>
            </div>
          </div>

          <div className="flex items-center cursor-pointer bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <div className="bg-blue-500 text-white p-3 rounded-full mr-4">
              <FaHourglassHalf className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Pending
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {totalPending}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {examStagess?.data?.stages?.map((stage, idx) => (
            <div
              key={idx}
              className={`bg-white cursor-pointer dark:bg-gray-800 rounded-lg shadow transition hover:shadow-lg border-l-4 ${
                idx % 2 === 0
                  ? "border-blue-500"
                  : "border-[var(--secondary-color)]"
              } p-4 flex flex-col justify-between`}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {stage.stageName}
                </h3>
                <p className="text-sm flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                  <MdPendingActions size={18} /> {stage.pendingRequestsCount}{" "}
                  Pending
                </p>
              </div>

              <div
                onClick={() => {
                  setSelectedStage(stage);
                  window.scrollTo(0, 0);
                }}
                className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center"
              >
                <button className=" cursor-pointer text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 text-sm">
                  <a href="#top" className=" flex items-center">
                    {" "}
                    Select <FaChevronRight className="ml-1 h-3 w-3" />
                  </a>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
