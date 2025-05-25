import { useState, useEffect, useRef } from "react";
import { FaPlus, FaSearch, FaChevronRight, FaCheck, FaClock } from "react-icons/fa";
import Title from "../../../components/admin/shared/Title";
import { IoMdAddCircleOutline } from "react-icons/io";
import Search from "../../../components/admin/shared/Search";
import NoResultFound from "../../../components/shared/NoResultFound";
import { useLocation, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import useFetchTaskStage from "../../../hooks/seniorExaminer/manageTask/useFetchTaskStage";
import Spinner from "../../../components/shared/dashboard/Spinner";
import { useAuthContext } from "../../../contexts/AuthProvider";
import Extract from "../../../utils/Extract";
import useFetchExaminerById from "../../../hooks/examiner/useFetchExaminerById";

const initialStages = [
  {
    id: 1,
    name: "Exam Stage",
    description: "Tasks related to candidate examination process",
    order: 1,
    type: "task",
  },
  {
    id: 2,
    name: "Interview Stage",
    description: "Tasks for the interview process",
    order: 2,
    type: "task",
  },
  {
    id: 3,
    name: "Assessment Stage",
    description: "Technical assessment tasks",
    order: 3,
    type: "task",
  },
  {
    id: 4,
    name: "Waiting",
    description: "Candidate is waiting",
    order: 4,
    type: "status",
  },
  {
    id: 5,
    name: "Passed",
    description: "Candidate passed this step",
    order: 5,
    type: "status",
  },
  {
    id: 6,
    name: "Reference Check",
    description: "Reference verification tasks",
    order: 6,
    type: "task",
  },
  {
    id: 7,
    name: "Failed",
    description: "Candidate failed this step",
    order: 7,
    type: "status",
  },
  {
    id: 8,
    name: "Onboarding",
    description: "New hire onboarding tasks",
    order: 8,
    type: "task",
  },
];

export default function Task() {
  const [stages, setStages] = useState(initialStages);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState(null);
   const { auth } = useAuthContext();
    let role;
    let id;
    let isExaminer = false;
    if (auth) {
      id = Extract(auth, "nameid");
      role = Extract(auth, "role");
      isExaminer = role === "Examiner" || role === "SeniorExaminer";
    }
   const { data: examinerInfo } = useFetchExaminerById(id, isExaminer);
  console.log(examinerInfo,'inside task view //////////////////////////////////')
  const { data: trackTaskStage, isLoading } = useFetchTaskStage(examinerInfo.data.workingTracks[0].id);
  console.log(
    trackTaskStage?.data.length,
    "llllllllllllllllllllllllllllllllllllllll;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;"
  );
  const selectElement = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const isSenior = location.pathname.includes("/senior");
  const filteredStages = trackTaskStage?.data && trackTaskStage?.data.filter((t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase())
    ); ;
  useEffect(() => {
    if (selectedStage && selectElement.current) {
      selectElement.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedStage]);

  const handleStageSelect = (stage) => {
    setSelectedStage(stage.id == selectedStage?.id ? null : stage);
  };
  if (isLoading) return <Spinner text={"Stage Task Page"} />;
  if ( trackTaskStage?.data.length == 0)
      return (
        <>
          <Title>Task Stages</Title>
          <div className="h-[70vh] flex items-center justify-center">
            <div className="p-8 text-center  text-gray-500 dark:text-gray-400">
              <FaClock className="mx-auto text-4xl mb-4" />
              <p className="text-lg">No Task Stage Found</p>
            </div>
          </div>
        </>
      );
  return (
    <div className="flex flex-col min-h-screen  text-gray-900  dark:text-white">
      <header>
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Title>Task Stages</Title>
            {isSenior && selectedStage && (
              <span
                onClick={() =>
                  navigate("/dashboard/seniorExaminer/manage-task", {
                    state: { stage: selectedStage },
                  })
                }
                className="inline-block px-3 py-1 cursor-pointer text-sm text-blue-600 bg-blue-100  hover:bg-blue-200 rounded-md"
              >
                View Task
              </span>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 pb-6 sm:pb-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="max-w-md w-full">
            <Search search={searchQuery} setSearch={setSearchQuery} />
          </div>
        </div>
        {filteredStages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredStages.map((stage, ind) => (
              <div
                key={stage.id}
                className={`bg-white relative hover:shadow-lg  dark:bg-gray-800 dark:hover:bg-gray-750 rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-200 transform hover:-translate-y-1 ${
                  selectedStage?.id === stage.id
                    ? `ring-1 ${
                        ind % 2 == 0
                          ? "ring-blue-500"
                          : "ring-[var(--secondary-color)]"
                      } `
                    : ""
                }`}
                onClick={() => handleStageSelect(stage)}
              >
                <div
                  className={`border-5 ${
                    ind % 2 == 0
                      ? "border-blue-500"
                      : "border-[var(--secondary-color)]"
                  }  `}
                ></div>
                <div className="p-4 md:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <div className="flex-shrink-0 h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                          <span className="text-blue-700 dark:text-blue-500 font-medium">
                            {stage.order}
                          </span>
                        </div>
                        <h3 className="text-base md:text-lg font-medium text-gray-900 dark:text-white">
                          {stage.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {stage.description}
                      </p>
                    </div>
                    {selectedStage?.id === stage.id && (
                      <div className="bg-blue-500 text-white rounded-full p-1">
                        <FaCheck className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <button className="flex items-center cursor-pointer text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 text-sm">
                      Select <FaChevronRight className="ml-1 h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoResultFound text=" task stages " />
        )}
        {selectedStage && !isSenior && (
          <div
            ref={selectElement}
            className="mt-8 bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-lg p-4 md:p-6"
          >
            <div className="flex justify-between items-center flex-col sm:flex-row">
              <h3 className="md:text-[22px] text-lg font-medium text-blue-500  dark:text-white mb-2">
                Selected Task Stage :
              </h3>
              <button
                // smooth
                // to="/dashboard/Examiner/add-task#top"
                onClick={() =>
                  navigate("/dashboard/Examiner/add-task", {
                    state: { stage: selectedStage },
                  })
                }
                className="flex items-center text-sm cursor-pointer hover:text-blue-500"
              >
                <IoMdAddCircleOutline className="mr-1" size={18} />
                <span>Add Task To {selectedStage.name}</span>
              </button>
            </div>
            <div className=" sm:shadow dark:bg-gray-800 dark:border-gray-700 dark:shadow-dark rounded-md p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Stage Name
                  </p>
                  <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
                    {selectedStage.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Stage Order
                  </p>
                  <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
                    {selectedStage.order}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Description
                </p>
                <p className="mt-1 text-gray-700 dark:text-gray-300">
                  {selectedStage.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
