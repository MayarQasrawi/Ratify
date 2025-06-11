import { useState, useEffect } from "react";
import {
  FaBell,
  FaCalendarAlt,
  FaBriefcase,
  FaClipboardCheck,

  FaArrowRight,
} from "react-icons/fa";
import { GraduationCap } from 'lucide-react';

import { useNavigate } from "react-router-dom";
import IconActionButton from "../../Button/IconActionButton";
import Lottie from "lottie-react";
import animationData from "../../../assets/img/animation/ApplicantRocket.json";
import { useAuthContext } from "../../../contexts/AuthProvider";
import Extract from "../../../utils/Extract";

function DashboardHeader() {
  const [greeting, setGreeting] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    setCurrentDate(new Date().toLocaleDateString("en-US", options));
  }, []);

  const { auth } = useAuthContext();
  let name = null;

  if (auth) {
    name = Extract(auth, "unique_name");
  }

  const handleNavigateToCertificate = () => {
    navigate("/applicant/my-certificate"); 
  };

  return (
    <div className="p-6 mb-8 text-[var(--secondary-color)]">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">
            {greeting + ", "}
            <span className="text-[var(--main-color)]">
              {name ? name : "Applicant"} 👋
            </span>
          </h1>
          <div className="flex items-center mt-2 text-sm text-gray-700">
            <FaCalendarAlt className="mr-2" />
            <span>{currentDate}</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={handleNavigateToCertificate}
              className="inline-flex items-center cursor-pointer gap-3 px-4 py-2 
             border-2 border-[var(--secondary-color)] text-blue-600 
             hover:bg-blue-500 hover:text-white  hover:border-blue-500
             font-medium rounded-full 
             transition-all duration-200 ease-in-out 
             shadow-sm hover:shadow-md"
            >
              < GraduationCap className="w-5 h-5" />
              <span>View Certificates</span>
              <FaArrowRight className="w-4 h-4" />
            </button>

            {/* Uncomment and customize other action buttons as needed */}
            {/* <IconActionButton label="Notifications" Icon={FaBell} color="yellow" onClick={() => console.log('Notifications')} />
            <IconActionButton label="Applied Tracks" Icon={FaBriefcase} color="yellow" onClick={() => console.log('Applied Tracks')} />
            <IconActionButton label="Completed" Icon={FaClipboardCheck} color="yellow" onClick={() => console.log('Completed')} />
            <IconActionButton label="Pending" Icon={FaClock} color="yellow" onClick={() => console.log('Pending')} /> */}
          </div>
        </div>

        <div className="hidden md:block w-full max-w-[220px] lg:max-w-[400px]">
          <Lottie animationData={animationData} loop={true} />
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
