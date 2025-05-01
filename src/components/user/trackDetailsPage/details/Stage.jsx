import { FaCheckCircle, FaBook, FaCode, FaUserTie } from "react-icons/fa";


export default function Stage({stageType}) {
  return (
    <div className="flex flex-col items-start space-y-6 pl-6 relative">
      {stageType.length>0 && stageType.map((stage, index) => (
        <div key={index} className="flex items-start relative">
          <div className="flex flex-col items-center mr-4">
            <FaCheckCircle className="text-green-500 text-3xl" />
              <div className="w-[2px] h-12 bg-gray-300 mt-1"></div>
          </div>
          <div className="shadow-lg cursor-pointer w-[220px] sm:w-96 p-4  transition border border-gray-200 rounded-lg bg-white">
            <div className="p-4">
              <div className="flex flex-col sm:flex-row items-center gap-2 text-gray-900">
                {stage =='Exam'? <FaBook className="text-blue-500 text-2xl" />:stage.title =='Interview'? <FaCode className="text-blue-500 text-2xl" />:<FaUserTie className="text-blue-500 text-2xl" />}
                <h3 className="text-lg font-semibold inline-block">{stage}</h3>
              </div>
            </div>
          </div>
        </div>
      ))}
      
    </div>
  );
}