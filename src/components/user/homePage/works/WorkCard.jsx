import { FaChevronRight } from "react-icons/fa";

export default function WorkCard({text,img}) {
  return (
   <div className="flex items-center gap-2 ">
    <div className=" px-3 py-2 flex flex-col justify-center items-center gap-2">
    <img src={img}  className="w-[80px] lg:w-[120px] "/>
      <h3 className=" text-white  font-bold mb-2 text-[15px] text-center">{text}</h3>
      
    </div>
   {text == 'Loss Job Seeker' && <FaChevronRight className="text-2xl text-[#3B82F6] mx-2 block" />}

    </div> 
  )
}
