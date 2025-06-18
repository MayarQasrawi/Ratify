import { FiCalendar, FiExternalLink } from "react-icons/fi";
import Lottie from "lottie-react";

export default function MeetingInfoSection({
  scheduledDate = "Not set",
  meetingLink,
  animationData,
}) {
  return (
    <div className="flex flex-col md:grid md:grid-cols-3 gap-2 items-center justify-between mt-4">
      {/* Information Section */}
      <div className="space-y-4 w-96 md:col-span-2 md:w-[80%]">
        {/* Scheduled Date */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg ">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <FiCalendar className="w-4 h-4 text-[var(--main-color)]" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 font-medium">Scheduled Date</p>
            <p className="text-gray-900 font-semibold">{scheduledDate}</p>
          </div>
        </div>

        {/* Meeting Link */}
        {meetingLink && (
          <div className="  pt-2  ">
            <a
              href={meetingLink}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3  bg-[var(--main-color)]  hover:bg-[var(--secondary-color)] text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiExternalLink className="w-4 h-4" />
              Join Meeting
            </a>
          </div>
        )}
      </div>

      {/* Animation Section */}
      <div className="w-32 h-48 md:w-70 md:h-70 col-span-1 flex items-center justify-center">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
}
