import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/admin/sidbar/Sidebar";
import TopMenue from "../components/admin/TopMenue";
import { ThemeProvider } from "../hooks/ThemeProvider";
import { useState } from "react";
import { PiListBold } from "react-icons/pi";

export default function Dashboard() {
  // const {auth} = useAuthContext();
  // if (typeof auth !== "string") {
  //   return <Navigate to="/login" />;

  // }

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  const currentLocation = useLocation();
  if (currentLocation.pathname == "/dashboard/Admin/tracks/setup")
    return <Outlet />;
  return (
    <ThemeProvider>
      <div className="flex flex-row  gap-2 md:gap-10 bg-[var(--background-color)] h-screen  text-[var(--text-color)] font-medium">
        
        {/* {sidebar} */}
        <div className="bg-[var(--sidebar-bg)]   fixed  h-[98vh] md:py-4 w-8 sm:w-48 md:w-64 p-1.5 md:p-2 min-w-[70px] shadow rounded-xl lg:m-[0.5%] m-[1%]">
          <div className="hidden  sm:flex flex-col items-center gap-2 pb-5 pl-3">
            <div className="mt-1 w-16 h-16 rounded-full bg-[var(--sidebar-icon-bg)] flex items-center justify-center text-[var(--sidebar-text)] font-semibold text-[18px]">
              L
            </div>
            <h1 className="text-[30px] text-[var(--sidebar-text)] font-medium">
              Lamar
            </h1>
          </div>
          <Sidebar />
        </div>

        {/*  Top Menu and Content Area */}
        <div className="ml-16 sm:ml-48 md:ml-64 h-full  w-full overflow-y-auto">
           
           {/* Top Menu with mobile toggle button */}
        
           
              
           
        


          {/* Top Menu */}
          <div className="relative top-1.5  right-0 ">
            {/* <div className="flex items-center justify-between "> */}
            {/* <button
                onClick={()=> setIsSidebarOpen(!isSidebarOpen)}
                className="text-2xl  ml-4 p-2 hover:bg-gray-200 rounded-lg"
              >
               <PiListBold />
              </button> */}

              <TopMenue />
{/* 
            </div> */}
          </div>

        

          {/* Scrollable Content */}
          <div className="p-5 md:p-10  ">
            <Outlet />
          </div>
        </div>


      </div>
    </ThemeProvider>
  );
}

