import React from "react";
import { FiFile, FiLayers, FiCheckSquare, FiPlus } from "react-icons/fi";
import { BsPuzzle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const structureItems = [
  {
    key: "levels",
    title: "Levels",
    description:
      "Levels represent major categories in the evaluation process. Each track can have multiple levels that applicants progress through.",
    Icon: FiLayers,
    bgClass: "bg-blue-100",
    iconColorClass: "text-blue-600",
  },
  {
    key: "stages",
    title: "Stages",
    description:
      "Each level contains multiple stages. Stages are distinct phases focused on specific skills or knowledge areas.",
    Icon: BsPuzzle,
    bgClass: "bg-green-100",
    iconColorClass: "text-green-600",
  },
  {
    key: "criteria",
    title: "Criteria",
    description:
      "Criteria are detailed evaluation points within each stage. They help ensure all examiners assess applicants consistently.",
    Icon: FiCheckSquare,
    bgClass: "bg-purple-100",
    iconColorClass: "text-purple-600",
  },
];

export default function PlanStructure() {
  const navigate=useNavigate()
  return (
    <div className="max-w-4xl mx-auto p-6 mt-[4vh] bg-white rounded-lg shadow-md r">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-4 rounded-full shadow-sm">
            <FiFile size={32} className="text-blue-600" />
          </div>
        </div>
        <h1 className="text-md sm:text-lg md:text-2xl font-bold mb-2">No Evaluation Plan Defined</h1>
      </div>
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4 hidden sm:block">
          Understanding the Plan Structure
        </h2>

        <div className="space-y-6">
          {structureItems.map(
            ({ key, title, description, Icon, bgClass, iconColorClass }) => (
              <div key={key} className="flex items-start">
                <div className={`${bgClass} p-2 rounded-md mr-4 shadow-sm`}>
                  <Icon size={24} className={iconColorClass} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">{title}</h3>
                  <p className="text-gray-600 text-sm hidden sm:block">
                    {description}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={()=>navigate('/dashboard/seniorExaminer/plan-setup',{ state: { source: 'define' } })}
          className="inline-flex items-center cursor-pointer gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition-all duration-150"
        >
          <FiPlus />
          <span className="hidden sm:inline">Define Plan</span>
        </button>
      </div>
    </div>
  );
}

