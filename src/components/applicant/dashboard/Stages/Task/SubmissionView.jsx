import React, { useState } from "react";
import { Calendar, Clock, ExternalLink, Link2 } from "lucide-react";
import { format } from "date-fns";
import Lottie from "lottie-react";
import submissionAnimation from "@/assets/img/animation/Link.json"; // Adjust the path as necessary
export default function SubmissionView({ submissionDate, submissionId, onViewSubmission }) {
  const [isHovering, setIsHovering] = useState(false);

  const date = new Date(submissionDate);
  const formattedDate = format(date, "dd MMM yyyy");
  const formattedTime = format(date, "hh:mm a");

  const handleViewSubmission = () => {
    if (onViewSubmission) {
      onViewSubmission(submissionId);
    }
  };

  return (
      <>
    <div className=" transition-shadow duration-300 p-5 flex justify-between items-start">
      {/* Left Side: Content */}
      <div className="flex-1 flex flex-col space-y-4 bg-gradient-to-br from-white to-gray-50 p-5 rounded-lg border border-gray-200  max-w-2xl">
        {/* Submission ID Header */}
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">Submission #{submissionId}</h3>
          <span className="px-3 py-1 bg-blue-50 text-[var(--main-color)] text-xs font-medium rounded-full">
            Submitted
          </span>
        </div>

        {/* Date and Time */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{formattedDate}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">{formattedTime}</span>
          </div>
        </div>

        {/* View Submission Button */}
        <button
          onClick={handleViewSubmission}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="mt-2 w-full flex items-center justify-center space-x-2 hover:bg-[var(--main-color)] bg-[var(--secondary-color)] text-white py-2 px-4 rounded-md transition-all duration-300"
        >
          <span>View Submission</span>
          <ExternalLink
            className={`h-4 w-4 ${isHovering ? "transform translate-x-1 -translate-y-1" : ""} transition-transform duration-300`}
          />
        </button>
      </div>

      {/* Right Side: Link Icon */}
      {/* <div className="ml-4 mt-1 text-[var(--main-color)]">
        <Link2 className="w-6 h-6" />
      </div> */}
        <div className="lg:flex items-center justify-center hidden">
        <Lottie
          animationData={submissionAnimation}
          loop
          autoplay
          style={{ height: 200, width: 200 }}
        />
      </div>
    </div>

    
     
     </>
  );
}
