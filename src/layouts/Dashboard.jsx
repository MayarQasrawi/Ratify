import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/admin/sidbar/Sidebar";
import TopMenue from '../components/admin/TopMenue';
import { ThemeProvider } from "../hooks/ThemeProvider";

export default function Dashboard() {
  // const {auth} = useAuthContext();
  // if (typeof auth !== "string") {
  //   return <Navigate to="/login" />;
  // }

  return (
    <ThemeProvider>
      <div className="flex gap-2 bg-[var(--background-color)] h-screen font-sans text-[var(--text-color)]">
        {/* Sidebar */}
        <div className="bg-[var(--sidebar-bg)] md:py-4 w-8 sm:w-48 md:w-64 p-1.5 md:p-2 min-w-[70px] shadow rounded-xl lg:m-[0.5%] m-[1%]">
          <div className="hidden sm:flex flex-col items-center gap-2 pb-5 pl-3">
            <div className="mt-1 w-16 h-16 rounded-full bg-[var(--sidebar-icon-bg)] flex items-center justify-center text-[var(--sidebar-text)] font-semibold text-[18px]">
              A
            </div>
            <h1 className="text-[30px] text-[var(--sidebar-text)] font-medium">
              Abrar
            </h1>
          </div>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex-col gap-5 pr-5">
          <div className="mt-1">
            <TopMenue />
          </div>
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
}