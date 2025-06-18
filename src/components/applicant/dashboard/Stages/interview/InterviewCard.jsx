import { FaClock, FaUser, FaCalendarAlt, FaInfoCircle, FaLightbulb } from "react-icons/fa"

import Card from '../../general/Card'; 
import useGetInterviewInfo from "@/hooks/applicant/interview/useGetInterviewInfo"; 
import Error from "@/components/admin/shared/Error"; 
export default function InterviewCard({ id }) { 
  const { data, isLoading, isError } = useGetInterviewInfo(id); 
 
  if (isError) return <p> <Error message="Failed to load interview information."/></p>; 
 
  const interview = data?.data; 
 
  const infoCards = [ 
    { 
      Icon: FaClock, 
      title: "Duration", 
      descriptions: `${interview?.durationMinutes || "N/A"} minutes`, 
    }, 
    { 
      Icon: FaUser, 
      title: "Status", 
      descriptions: interview?.status || "Unknown", 
    }, 
    { 
      Icon: FaCalendarAlt, 
      title: "Booking Window", 
      descriptions: `${interview?.maxDaysToBook || 0} days in advance`, 
    }, 
  ]; 
 
  return ( 
    <div className="w-full p-4"> 
     
 
     
          {interview?.instructions && (
        <div className="mb-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full -translate-y-8 translate-x-8"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200/30 to-transparent rounded-full translate-y-4 -translate-x-4"></div>

          {/* Content */}
          <div className="relative p-8 border border-blue-100/50 rounded-2xl backdrop-blur-sm">
            {/* Header with icon */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[var(--main-color)] to-indigo-600 rounded-xl shadow-lg">
                <FaLightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--main-color)] tracking-wide">INSTRUCTIONS</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-[var(--main-color)] to-indigo-600 rounded-full mt-1"></div>
              </div>
            </div>

            {/* Instructions content */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm">
              <div className="flex items-start gap-3">
                <FaInfoCircle className="w-5 h-5 text-[var(--main-color)] mt-1 flex-shrink-0" />
                <p className="text-gray-700 text-lg leading-relaxed font-medium">{interview.instructions}</p>
              </div>
            </div>

            {/* Bottom accent */}
            <div className="flex justify-center mt-4">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-[var(--main-color)] rounded-full"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
     
      <div className="flex flex-col md:flex-row gap-6 justify-between flex-wrap"> 
        {infoCards.map((card, index) => ( 
          <Card 
            key={index} 
            isLoading={isLoading} 
            Icon={card.Icon} 
            title={card.title} 
            descriptions={card.descriptions} 
          /> 
        ))} 
      </div> 
 
    </div> 
  ); 
}