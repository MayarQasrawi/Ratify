import { useState } from "react";
import { HiDotsVertical, HiOutlineDotsHorizontal } from "react-icons/hi";

export default function Action({ actions, icon = true }) {
  const [toggle, setToggle] = useState(false);
  
  return (
    <div className="relative">
      {icon ? (
        <div
          onClick={() => setToggle(!toggle)}
          className="cursor-pointer w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm 
          hover:bg-white shadow-md hover:shadow-lg transition-all duration-200
          flex items-center justify-center border border-gray-200/50
          dark:bg-gray-800/90 dark:hover:bg-gray-700 dark:border-gray-600/50"
        >
          <HiDotsVertical className="text-gray-700 dark:text-gray-300 text-lg" />
        </div>
      ) : (
        <div
          onClick={() => setToggle(!toggle)}
          className="cursor-pointer w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm 
          hover:bg-white shadow-md hover:shadow-lg transition-all duration-200
          flex items-center justify-center border border-gray-200/50
          dark:bg-gray-800/90 dark:hover:bg-gray-700 dark:border-gray-600/50"
        >
          <HiOutlineDotsHorizontal className="text-gray-700 dark:text-gray-300 text-xl" />
        </div>
      )}
      {toggle && (
        <ul
          className="absolute flex flex-col bg-white/95 backdrop-blur-md rounded-xl shadow-2xl 
          top-10 right-0 z-50 w-max min-w-[160px] overflow-hidden
          dark:bg-gray-800/95 border border-gray-200/30 dark:border-gray-600/30
          animate-in slide-in-from-top-2 duration-200"
        >
          {actions.map((action, index) => (
            <li
              key={index}
              className="text-sm cursor-pointer px-4 py-3 hover:bg-blue-50 text-left
              dark:hover:bg-blue-900/30 transition-all duration-150 
              first:rounded-t-xl last:rounded-b-xl whitespace-nowrap
              text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400
              font-medium border-b border-gray-100/50 dark:border-gray-700/50 last:border-b-0"
              onClick={() => {
                setToggle(false);
                action.onClick();
              }}
            >
              {action.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}