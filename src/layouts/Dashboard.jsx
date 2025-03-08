import { Outlet } from "react-router-dom";
import Sidebar from '../components/shared/sidbar/Sidebar'
import Navbar from '../components/user/shared/Navbar'

export default function Dashboard() {
  return (
<div className="flex gap-5 bg-[#f8f8f8] ">
    
   <div className="bg-white py-4 pl-3 h-screen w-[16%] sm:w-[30%] md:w-[19%] lg:w-[16%] min-w-[70px] shadow">
 <div className=" hidden sm:flex items-center gap-2 pb-5   justify-start pl-1">
    <div className=" w-9 h-9 rounded-full bg-[#E7ECFF] flex items-center justify-center text-[#3B82F6] font-semibold text-[18px]">
      A
    </div>
    <h1 className="text-[18px] text-[#3B82F6]  font-semibold" >Abrar</h1>
    </div>
      <Sidebar />
    </div>
    <div className="flex-1 flex flex-col gap-5 pr-5">
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}
