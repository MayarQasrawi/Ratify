<<<<<<< HEAD
"use client";

import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/admin/sidbar/Sidebar";
import TopMenue from "../components/admin/TopMenue";
import { ThemeProvider } from "../contexts/ThemeProvider";
import { SidebarProvider } from "../contexts/SidebarProvider";
import { useAuthContext } from "../contexts/AuthProvider";
import Extract from "../utils/Extract";
import useFetchExaminerById from "../hooks/examiner/useFetchExaminerById";
import { useEffect, useState } from "react";
import TopLoader from "../components/shared/TopLoader";
import ExaminerInfoModal from "../components/allExaminer/ExaminerInfoModal";
import getFirstCharacter from "../utils/getFirstCharacter";
import useGetCreationAssignment from "../hooks/examiner/useGetCreationAssignments";
import { useSidebar } from "../contexts/SidebarProvider";
=======
"use client"
import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "../components/admin/sidbar/Sidebar"
import TopMenue from "../components/admin/TopMenue"
import { ThemeProvider } from "../contexts/ThemeProvider"
import { SidebarProvider } from "../contexts/SidebarProvider"
import { useAuthContext } from "../contexts/AuthProvider"
import Extract from "../utils/Extract"
import useFetchExaminerById from "../hooks/examiner/useFetchExaminerById"
import { useEffect, useState } from "react"
import TopLoader from "../components/shared/TopLoader"
import ExaminerInfoModal from "../components/allExaminer/ExaminerInfoModal"
import getFirstCharacter from "../utils/getFirstCharacter"
import useGetCreationAssignment from "../hooks/examiner/useGetCreationAssignments"
import { useSidebar } from "../contexts/SidebarProvider"
>>>>>>> a333b403dd5f8f90af4276665c0c4606c2ea2bab

export default function Dashboard() {
  const { auth } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const currentLocation = useLocation();
  let role = "jjjjj";
  let id;
  let isExaminer = false;
  if (auth) {
    role = Extract(auth, "role");
    id = Extract(auth, "nameid");
    isExaminer = role === "Examiner" || role === "SeniorExaminer";
  }
<<<<<<< HEAD
  const { data: examinerInfo, isLoading } = useFetchExaminerById(
    id,
    isExaminer
  );
  const { data: examinerAssignment, error } = useGetCreationAssignment(
    id,
    role === "Examiner"
  );

  console.log(examinerAssignment, "examinerAssignment ...................");
  console.log(
    examinerInfo?.specialization,
    "test bbb is this field contain info////////// ",
    examinerInfo
  );

  useEffect(() => {
    if (!isLoading && isExaminer && examinerInfo) {
      const isInfoMissing = !examinerInfo.data.dateOfBirth;
      console.log(isInfoMissing, "info miss");
      setShowModal(isInfoMissing);
=======
  const { data: examinerInfo, isLoading } = useFetchExaminerById(id, isExaminer)
  const { data: examinerAssignment, error } = useGetCreationAssignment(id, role === "Examiner")
 console.log(examinerInfo,'examinerInfo examinerInfo')
  console.log(examinerAssignment, "examinerAssignment ...................")

  useEffect(() => {
    if (!isLoading && isExaminer && examinerInfo) {
      const isInfoMissing = !examinerInfo.data.image
      console.log(isInfoMissing, "info miss")
      setShowModal(isInfoMissing)
>>>>>>> a333b403dd5f8f90af4276665c0c4606c2ea2bab
    }
  }, [examinerInfo, isLoading, isExaminer]);

<<<<<<< HEAD
  if (showModal) return <ExaminerInfoModal setShowModal={setShowModal} />;
=======
  // if (showModal) return <ExaminerInfoModal setShowModal={setShowModal} />
>>>>>>> a333b403dd5f8f90af4276665c0c4606c2ea2bab

  if (
    currentLocation.pathname === "/dashboard/Admin/tracks/setup" ||
    currentLocation.pathname === "/dashboard/seniorExaminer/plan-setup"
  ) {
    return <Outlet />;
  }
  if (isLoading) {
    return <TopLoader isLoading={isLoading} />;
  }

  return (
    <>
      <ThemeProvider>
        <SidebarProvider>
          <DashboardContent
            role={role}
            examinerInfo={examinerInfo}
            examinerAssignment={examinerAssignment}
          />
        </SidebarProvider>
      </ThemeProvider>
    </>
  );
}

function DashboardContent({ role, examinerInfo, examinerAssignment }) {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className="flex flex-row gap-2 md:gap-10 bg-[var(--background-color)] min-h-screen text-[var(--text-color)] font-medium">
      {/* Sidebar */}
      <div
        className={`bg-[var(--sidebar-bg)] fixed h-[98vh] md:py-4 shadow rounded-xl lg:m-[0.5%] m-[1%] transition-all duration-300 ease-in-out ${
          isSidebarOpen
            ? "w-8 sm:w-48 md:w-66 p-1.5 md:p-2 min-w-[70px]"
            : "w-8 p-1.5 min-w-[70px]"
        }`}
      >
        <div
          className={`${
            isSidebarOpen ? "hidden sm:flex" : "hidden"
          } flex-col items-center gap-2 pb-5 pl-3`}
        >
          <div className="mt-1 w-16 h-16 rounded-full bg-[var(--sidebar-icon-bg)] flex items-center justify-center text-[var(--sidebar-text)] font-semibold text-[18px]">
            {role == "Examiner" || role == "SeniorExaminer"
              ? getFirstCharacter(examinerInfo?.data?.fullName)
              : "Y"}
          </div>
          <h1 className="text-2xl text-[var(--sidebar-text)] font-medium">
            {role == "Examiner" || role == "SeniorExaminer"
              ? examinerInfo?.data?.fullName.split(" ")[0]
              : "Abrar"}
          </h1>
        </div>
        <Sidebar
          ind={examinerAssignment?.data?.length > 0}
          collapsed={!isSidebarOpen}
        />
      </div>

      <div
        className={`transition-all duration-300 ease-in-out h-full w-full overflow-y-auto ${
          isSidebarOpen ? "ml-16 sm:ml-48 md:ml-64" : "ml-16"
        }`}
      >
        <div className="relative top-1.5 right-0">
          <TopMenue />
        </div>
        {/* Scrollable Content */}
        <div className="p-5 md:px-9 md:py-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
