import { IoIosReturnLeft } from "react-icons/io";

export default function Back({text,onClick}) {

  return (
    <div
       onClick={onClick}
       className="flex items-center gap-1 cursor-pointer font-mono font-semibold text-lg text-blue-500 hover:text-blue-600 dark:text-blue-600"
     >
       <IoIosReturnLeft size={25} />
       <span>{text}</span>
     </div>
  )
}