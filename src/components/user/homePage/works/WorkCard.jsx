import { FaChevronRight } from "react-icons/fa";

export default function WorkCard({text,img}) {
  return (
   <div className="flex items-center gap-2 ">
    <div className="bg-white min-w-[80px] rounded-md w-fit px-3 py-2 flex flex-col justify-center items-center gap-2">
      <h3 className="text-[#3B82F6] font-bold mb-2 text-[14px] text-center">{text}</h3>
      <img src={img}  className="w-[80px]"/>
    </div>
   {text == 'Loss Job Seeker' && <FaChevronRight className="text-2xl text-[#3B82F6] mx-2 block" />}

    </div> 
  )
}
