import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/admin/sidbar/Sidebar";
import TopMenue from "../components/admin/TopMenue";
import { ThemeProvider } from "../hooks/ThemeProvider";

export default function Dashboard() {
  // const {auth} = useAuthContext();
  // if (typeof auth !== "string") {
  //   return <Navigate to="/login" />;
  // }
  const currentLocation = useLocation();
  if (currentLocation.pathname == "/dashboard/Admin/tracks/setup")
    return <Outlet />;
  return (
    <ThemeProvider>
      <div className="flex gap-4 md:gap-8 bg-[var(--background-color)] h-screen font-sans text-[var(--text-color)]">
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

        <div className="flex-1 flex-col gap-8 pr-5">
          <div className="mt-1"></div>
          <div>
            <TopMenue />
            <Outlet />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
