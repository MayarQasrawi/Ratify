import { FaCheckCircle, FaBook, FaCode, FaUserTie } from "react-icons/fa";

const stages = [
  {
    title: "Theoretical Exam",
    icon: <FaBook className="text-blue-500 text-2xl" />, 
  },
  {
    title: "Technical Task",
    icon: <FaCode className="text-blue-500 text-2xl" />, 
  },
  {
    title: "Interview",
    icon: <FaUserTie className="text-blue-500 text-2xl" />, 
  },
];

export default function Stage() {
  return (
    <div className="flex flex-col items-start space-y-6 pl-6 relative">
      {stages.map((stage, index) => (
        <div key={index} className="flex items-start relative">
          <div className="flex flex-col items-center mr-4">
            <FaCheckCircle className="text-green-500 text-3xl" />
              <div className="w-[2px] h-12 bg-gray-300 mt-1"></div>
          </div>
          <div className="shadow-lg cursor-pointer w-96 p-4 hover:-translate-y-5 transition border border-gray-200 rounded-lg bg-white">
            <div className="p-4">
              <div className="flex items-center space-x-2">
                {stage.icon}
                <h3 className="text-lg font-semibold">{stage.title}</h3>
              </div>
            </div>
          </div>
        </div>
      ))}
      
    </div>
  );
}