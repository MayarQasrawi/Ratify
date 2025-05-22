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
    bgClass: "bg-blue-100 dark:bg-blue-900",
    iconColorClass: "text-blue-600 dark:text-blue-300",
  },
  {
    key: "stages",
    title: "Stages",
    description:
      "Each level contains multiple stages. Stages are distinct phases focused on specific skills or knowledge areas.",
    Icon: BsPuzzle,
    bgClass: "bg-green-100 dark:bg-green-900",
    iconColorClass: "text-green-600 dark:text-green-300",
  },
  {
    key: "criteria",
    title: "Criteria",
    description:
      "Criteria are detailed evaluation points within each stage. They help ensure all examiners assess applicants consistently.",
    Icon: FiCheckSquare,
    bgClass: "bg-purple-100 dark:bg-purple-900",
    iconColorClass: "text-purple-600 dark:text-purple-300",
  },
];

export default function PlanStructure() {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto p-6 mt-[4vh] bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full shadow-sm">
            <FiFile size={32} className="text-blue-600 dark:text-blue-300" />
          </div>
        </div>
        <h1 className="text-md sm:text-lg md:text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          Plan Structure
        </h1>
      </div>
      <div className="sm:bg-gray-50 dark:sm:bg-gray-700 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4 hidden sm:block text-gray-900 dark:text-white">
          Understanding the Plan Structure
        </h2>
        <div className="space-y-6">
          {structureItems.map(
            ({ key, title, description, Icon, bgClass, iconColorClass }) => (
              <div key={key} className="flex items-start">
                <div className={`${bgClass} p-2 rounded-md mr-4 shadow-sm`}>
                  <Icon size={24} className={`${iconColorClass}`} />
                </div>
                <div>
                  <h3 className="text-md sm:text-lg font-medium mb-1 text-gray-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm hidden sm:block">
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
          onClick={() =>
            navigate("/dashboard/seniorExaminer/plan-setup", { state: { source: 'define' } })
          }
          className="inline-flex items-center cursor-pointer gap-2 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-all duration-150"
        >
          <FiPlus className="text-white dark:text-white" />
          <span className="hidden sm:inline">Define Plan</span>
        </button>
      </div>
    </div>
  );
}

