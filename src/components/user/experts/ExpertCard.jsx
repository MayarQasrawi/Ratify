import { RiArrowRightLine,RiArrowRightSLine } from "react-icons/ri";

export default function ExpertCard({ img, name }) {
  return (
    <div className="border-4 border-[#2A5C8A] rounded-lg cursor-pointer w-fit mx-auto sm:mx-0  hover:translate-y-[-10px] transition duration-300 ">
      <div className="relative overflow-hidden">
        {" "}
        <img src={img} alt={name} className="w-[180px] " />
        <h3 className="text-[#0E2A46] font-bold text-center  py-2 bg-white absolute left-4 bottom-2 px-4 rounded-md">
          {name}
          <div className="mt-1">
            <div className="bg-[#FF914CC7] w-5 h-5 rounded-full flex items-center ml-auto cursor-pointer">
              <RiArrowRightLine className="-ml-1" />
            </div>
          </div>
        </h3>
      </div>
    </div>
  );
}
