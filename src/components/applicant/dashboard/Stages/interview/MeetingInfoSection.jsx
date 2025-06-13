import { FiCalendar, FiExternalLink } from "react-icons/fi";
import Lottie from "lottie-react";

export default function MeetingInfoSection({
  scheduledDate = "Not set",
  meetingLink,
  animationData,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center justify-between mt-4">
      {/* Information Section */}
      <div className="space-y-4 md:w-96">
        {/* Scheduled Date */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg ">
          <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <FiCalendar className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 font-medium">Scheduled Date</p>
            <p className="text-gray-900 font-semibold">{scheduledDate}</p>
          </div>
        </div>

        {/* Meeting Link */}
        {meetingLink && (
          <div className="pt-2">
            <a
              href={meetingLink}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3  bg-gradient-to-r from-[var(--main-color)] to-purple-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-[var(--main-color)] text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
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
      <div className="w-48 h-48 md:w-96 md:h-96">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
}
