import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import {HiOutlineLogout} from "react-icons/hi";
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="py-2.5 w-[100%] flex justify-end px-6  relative border-b  border-b-[#E7ECFF]">
      <FaUserCircle size={30} color="#EAECFF" onClick={() => setIsOpen(!isOpen)} className="cursor-pointer" />
      {isOpen && (
          <div className="absolute z-3 right-2.5 top-6 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-[#E7ECFF] cursor-pointer group"
            >
             <div className="text-gray-400 flex gap-2 items-center text-[14px] group-hover:text-[#3B82F6]"><HiOutlineLogout size={20}/> Logout</div>
            </button>
          </div>
        )}
    </nav>
  )
}
