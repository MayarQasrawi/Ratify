import { useState } from "react";
import { HiDotsVertical, HiOutlineDotsHorizontal } from "react-icons/hi";

export default function Action({ actions, icon = true }) {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="relative ">
      {icon ? (
        <HiDotsVertical
          onClick={() => setToggle(!toggle)}
          className="cursor-pointer text-md text-gray-600 hover:text-gray-800 text-lg p-1 rounded-full hover:bg-gray-200 dark:hover:hover:bg-[var(--table-border)] dark:hover:text-white transition"
        />
      ) : (
        <HiOutlineDotsHorizontal
          onClick={() => setToggle(!toggle)}
          className="cursor-pointer text-2xl  text-gray-600 hover:text-gray-800 mr-1 p-1 rounded-full hover:bg-gray-200 transition"
        />
      )}
      {toggle && (
        <ul
          className="absolute  flex flex-col  bg-white rounded-lg  shadow-lg top-6 left-1/2 transform -translate-x-1/2 z-10 w-max dark:bg-gray-600 
        dark:shadow-lg dark:shadow-gray-900/50
        border border-gray-200 dark:border-gray-700
        divide-y divide-gray-100 dark:divide-gray-700
        
        "
        >
          {actions.map((action, index) => (
            <li
              key={index}
              className="text-sm cursor-pointer px-2 py-1 hover:bg-gray-100 text-center  dark:hover:bg-gray-500  transition-colors duration-150 first:rounded-t-md last:rounded-b-md "
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
