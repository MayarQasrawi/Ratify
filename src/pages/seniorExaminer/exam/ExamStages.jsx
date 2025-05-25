import React, { useState, useEffect } from "react";
import {
  FaFileAlt,
  FaHourglassHalf,
  FaExclamationCircle,
  FaChevronRight,
} from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import Spinner from "../../../components/shared/dashboard/Spinner";
import Title from "../../../components/admin/shared/Title";
import useGetExamStages from "../../../hooks/seniorExaminer/examRequest/useGetExamStages";
import { useAuthContext } from "../../../contexts/AuthProvider";
import useFetchExaminerById from "../../../hooks/examiner/useFetchExaminerById";
import Extract from '../../../utils/Extract'
export default function ExamStages() {
    const { auth } = useAuthContext();
  const [examStages, setExamStages] = useState([]);
  const [selectedStage, setSelectedStage] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
   let role;
  let id;
  let isExaminer = false;
  if (auth) {
    id = Extract(auth, "nameid");
    role = Extract(auth, "role");
    isExaminer = role === "Examiner" || role === "SeniorExaminer";
  }
//   const { data: examinerInfo } = useFetchExaminerById(id, isExaminer);
//   console.log(examinerInfo)
//   const { data:examStages, isLoading } = useGetExamStages(examinerInfo.data.workingTracks[0].id);
  useEffect(() => {
    const fetchExamStages = async () => {
      try {
        setLoading(true);
        const mockData = [
          { id: 1, name: "Mathematics Final Exam", totalPending: 45 },
          { id: 2, name: "Physics Midterm", totalPending: 23 },
          { id: 3, name: "Chemistry Lab Test", totalPending: 12 },
          { id: 4, name: "Biology Practical", totalPending: 8 },
          { id: 5, name: "English Literature", totalPending: 34 },
          { id: 6, name: "Computer Science", totalPending: 67 },
          { id: 7, name: "Economics Theory", totalPending: 15 },
        ];

        setTimeout(() => {
          setExamStages(mockData);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError("Failed to fetch exam stages");
        setLoading(false);
      }
    };

    fetchExamStages();
  }, []);

  if (loading) return <Spinner text="Exam Stage Page" />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <FaExclamationCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  const totalStages = examStages.length;
  const totalPending = examStages.reduce((sum, s) => sum + s.totalPending, 0);
  console.log(selectedStage, "inside exam stage task ");
  return (
    <div className="min-h-screen p-4 sm:p-6">
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
          <div className="flex items-center bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
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

          <div className="flex items-center bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
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
          {examStages.map((stage, idx) => (
            <div
              key={stage.id}
              className={`bg-white cursor-pointer dark:bg-gray-800 rounded-lg shadow transition hover:shadow-lg border-l-4 ${
                idx % 2 === 0
                  ? "border-blue-500"
                  : "border-[var(--secondary-color)]"
              } p-4 flex flex-col justify-between`}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {stage.name}
                </h3>
                <p className="text-sm flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                  <MdPendingActions size={18} /> {stage.totalPending} Pending
                </p>
              </div>

              <div
                onClick={() => setSelectedStage(stage)}
                className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center"
              >
                <button className="flex items-center cursor-pointer text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 text-sm">
                  Select <FaChevronRight className="ml-1 h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
