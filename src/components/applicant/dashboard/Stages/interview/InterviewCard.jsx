import { FaClock, FaUser, FaCalendarAlt } from "react-icons/fa"; 
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
     
 
      {/* Instructions Section */}
     
      <div className="flex flex-col md:flex-row gap-6 justify-around flex-wrap"> 
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
        {interview?.instructions && (
        <div className="mt-6 p-8 bg-gray-100 rounded-lg ">
          <h3 className="text-xl font-bold mb-3 " >
         {  "Instructions".toUpperCase() }
          </h3>
          <div 
            className="text-md leading-relaxed text-[#5F5D5D]" 
         
          >
            {interview.instructions}
          </div>
        </div>
      )}
 
    </div> 
  ); 
}