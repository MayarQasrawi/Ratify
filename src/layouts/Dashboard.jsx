import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/admin/sidbar/Sidebar";
import TopMenue from "../components/admin/TopMenue";
import { ThemeProvider } from "../hooks/ThemeProvider";
import { useAuthContext } from "../contexts/AuthProvider";
import Extract from "../utils/Extract";
import useFetchExaminerById from "../hooks/examiner/useFetchExaminerById";
import { useEffect, useState } from "react";
import TopLoader from "../components/shared/TopLoader";
import ExaminerInfoModal from "../components/allExaminer/ExaminerInfoModal";

export default function Dashboard() {
  const { auth } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const currentLocation = useLocation();

  let role = "ex";
  let id;
  let isExaminer = false;

  if (auth) {
    role = Extract(auth, "role");
    id = Extract(auth, "nameid");
    isExaminer = role === "Examiner";
  }

  const { data: examinerInfo, isLoading } = useFetchExaminerById(id, isExaminer);

  useEffect(() => {
    if (!isLoading && isExaminer && examinerInfo) {
      const isInfoMissing = !examinerInfo.specialization;
      setShowModal(isInfoMissing);
    }
  }, [examinerInfo, isLoading, isExaminer]);

  if (showModal) return <ExaminerInfoModal setShowModal={setShowModal} />;

  if (
    currentLocation.pathname === "/dashboard/Admin/tracks/setup" ||
    currentLocation.pathname === "/dashboard/seniorExaminer/plan-setup"
  ) {
    return <Outlet />;
  }

  return (
    <>
      {isLoading && <TopLoader isLoading={isLoading} />}
      <ThemeProvider>
        <div className="flex gap-4 md:gap-8 bg-[var(--background-color)] min-h-screen font-sans text-[var(--text-color)]">
          <div className="bg-[var(--sidebar-bg)] md:py-4 w-8 sm:w-48 md:w-64 p-1.5 md:p-2 min-w-[70px] shadow rounded-xl lg:m-[0.5%] m-[1%]">
            <div className="hidden lg:flex flex-col items-center gap-2 pb-5 pl-3">
              <div className="mt-1 w-16 h-16 rounded-full bg-[var(--sidebar-icon-bg)] flex items-center justify-center text-[var(--sidebar-text)] font-semibold text-[18px]">
                A
              </div>
              <h1 className="text-[30px] text-[var(--sidebar-text)] font-medium">Abrar</h1>
            </div>
            <Sidebar />
          </div>
          <div className="flex-1 flex-col gap-8 pr-5">
            <TopMenue />
            <div className="p-4 md:p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

