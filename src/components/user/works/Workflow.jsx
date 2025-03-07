import React from "react";
import myImg1 from "../../../assets/img/home/work_end.svg";
import {
  FaUserGraduate,
  FaCalendarAlt,
  FaTasks,
  FaComments,
  FaAward,
  FaChevronRight,
  FaSearch,
  FaRocket,
} from "react-icons/fa";
import WorkCard from "./WorkCard";
const steps = [
  {
    title: "Choose a Track",
    icon: <FaSearch />,
  },
  {
    title: "Start Assessment Journey",
    icon: <FaRocket />,
  },
  {
    title: "Take Task, Interview, Exam",
    icon: <FaTasks />,
  },
  {
    title: "Get Real Feedback",
    icon: <FaComments />,
  },
  {
    title: "Take Certificate",
    icon: <FaAward />,
  },
];
export default function Workflow() {
  return (
    <div>
      <div className=" flex-wrap lg:flex-nowrap justify-center sm:justify-between md:justify-center flex items-center gap-x-2 gap-y-4 p-2 ">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex  min-w-[85px] flex-col items-center w-[16%] cursor-pointer hover:translate-y-[-10px] transition duration-300">
              <div className="border-2 border-[#3B82F6] text-white rounded-lg  p-3  ">
                <span className="text-2xl text-white mb-2">{step.icon}</span>
              </div>
              <p className="text-center text-[#FDFDFD] md:text-sm text-[12px] sm:text-[12px] mt-1">
                {step.title}
              </p>
            </div>

            <FaChevronRight className="text-2xl text-[#3B82F6] mx-2 hidden sm:block  " />
          </React.Fragment>
        ))}
        <div className="text-right">
          <WorkCard text="More confident seeker " img={myImg1} />
        </div>
      </div>
    </div>
  );
}
