import { RiArrowRightLine,RiArrowRightSLine } from "react-icons/ri";

export default function ExpertCard({ img, name,role }) {
  return (
    <div className="rounded-lg cursor-pointer w-fit mx-auto sm:mx-0  border border-3 border-white    hover:scale-105 transition duration-300 ">
      <div className="relative overflow-hidden">
        {" "}
        <img src={img} alt={name} className="w-[180px] " />
        <div className=" text-center  py-1 bg-white absolute left-4 bottom-2 px-4 rounded-md">
         <h3 className="text-[#0E2A46] font-bold">{name} </h3>
          
          <div className="mt-1">
          <p className="text-sm">{role}</p>
            <div className="bg-[var(--main-color)] w-5 h-5 rounded-full flex items-center ml-auto cursor-pointer">
              <RiArrowRightLine className="-ml-1 font- " />
            </div>
          </div>
        </div>
    
      </div>
    </div>
  );
}
