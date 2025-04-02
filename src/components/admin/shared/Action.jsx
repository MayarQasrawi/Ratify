import { useState } from "react";
import { HiDotsVertical,HiOutlineDotsHorizontal } from "react-icons/hi";

export default function Action({ actions,icon=true }) {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="relative inline-block">
    {icon? <HiDotsVertical
        onClick={() => setToggle(!toggle)}
        className="cursor-pointer text-md text-gray-600 hover:text-gray-800 text-lg p-1 rounded-full hover:bg-gray-200 transition"
      />:<HiOutlineDotsHorizontal onClick={() => setToggle(!toggle)} className="cursor-pointer text-2xl  text-gray-600 hover:text-gray-800 mr-1 p-1 rounded-full hover:bg-gray-200 transition" />}
      {toggle && (
        <ul className="absolute flex flex-col gap-2 font-medium py-2 bg-white border border-gray-300 rounded-lg pl-3 pr-6 shadow-lg top-6 left-1/2 transform -translate-x-1/2 z-10 w-max">
          {actions.map((action, index) => (
            <li
              key={index}
              className="text-sm cursor-pointer px-2 py-1 hover:bg-gray-100 rounded transition"
              onClick={() =>{ setToggle(false);action.onClick()}}
            >
              {action.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}