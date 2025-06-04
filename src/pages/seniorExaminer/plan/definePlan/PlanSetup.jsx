import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsArrowRight } from "react-icons/bs";
import { BiPlusCircle, BiSave } from "react-icons/bi";
import Button from "../../../../components/seniorExaminer/plan/Button";
import Alert from "../../../../components/shared/Alert";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import useAddPlan from "../../../../hooks/seniorExaminer/plan/useAddPlan";
import Spinner from "../../../../components/shared/Spinner";
import Back from "../../../../components/shared/dashboard/Back";
import { FiAlertCircle } from "react-icons/fi";
import useAddStage from "../../../../hooks/seniorExaminer/plan/useAddStage";
const stageFields = [
  { name: "daysToSubmit", label: "Days to Submit" },
  { name: "description", label: "Description" },
  { name: "requirements", label: "Requirements" },
];
const bookingFields = [
  { name: "maxDaysToBook", label: "Max Days to Book" },
  { name: "durationMinutes", label: "Duration (Minutes)" },
  { name: "instructions", label: "Instructions", type: "textarea" },
];
const examFields = [
  {
    name: "difficulty",
    label: "Difficulty",
    options: ["Easy", "Medium", "Hard"],
    multiple: false,
  },
  {
    name: "questionsType",
    label: "Questions Type",
    options: ["MultipleChoice", "Essay", "Coding", "TrueFalse"],
    multiple: true,
  },
  { name: "durationMinutes", label: "Duration (Minutes)" },
];
export default function PlanSetup() {
  const location = useLocation();
  console.log(
    location?.state?.track?.id,
    location?.state?.track?.name,
    "lllllllllllllllllllllllllllllllllllllllllllllllll"
  );
  const [levels, setLevels] = useState([]);
  const [isWeightValid, setIsWeightValid] = useState(null);
  const [activeLevelIndex, setActiveLevelIndex] = useState(-1);
  const [activeStageIndex, setActiveStageIndex] = useState(null);
  const [selectedStage, setSelectedStage] = useState("Interview");
  console.log(selectedStage, "stage inside plan ss");
  const navigate = useNavigate();
  const source = location.state?.source;
  const [formState, setFormState] = useState(() =>
    source == "add-stage" ? "stage" : "level"
  );
  const {
    mutate: addPlan,
    isError: isAddPlanError,
    isPending: isAddPlanPending,
    isSuccess: isAddPlanSuccess,
    error,
  } = useAddPlan();
  const {
    mutate: addStage,
    isError: isAddStageError,
    isPending: isAddStagePending,
    isSuccess: isAddStageSuccess,
    data: stageAddData,
  } = useAddStage();
  console.log(error);
  console.log(location.state.length);
  useEffect(() => {
    if (isWeightValid) setTimeout(() => setIsWeightValid(null), 1500);
  }, [isWeightValid]);
  const {
    register: registerLevel,
    handleSubmit: handleSubmitLevel,
    reset: resetLevelForm,
    formState: { errors: levelErrors },
  } = useForm();
  const {
    register: registerStage,
    handleSubmit: handleSubmitStage,
    reset: resetStageForm,
    formState: { errors: stageErrors },
  } = useForm();

  const {
    register: registerCriterion,
    handleSubmit: handleSubmitCriterion,
    reset: resetCriterionForm,
    formState: { errors: criterionErrors },
  } = useForm();
  const {
    register: handleExamInfo,
    formState: { errors: examInfoErrors },
    trigger: triggerExam,
    getValues: getExamValues,
    reset: resetExamInfo,
  } = useForm();
  const {
    register: handleTaskInfo,
    formState: { errors: TaskInfoErrors },
    trigger: triggerTask,
    getValues: getTaskValues,
    reset: resetTaskInfo,
  } = useForm();
  const {
    register: handleInterviewInfo,
    formState: { errors: interviewInfoErrors },
    trigger: triggerInterview,
    getValues: getInterviewValues,
    reset: resetInterviewInfo,
  } = useForm();
  const getNextLevelOrder = () => {
    if (levels.length === 0) return 1;
    return Math.max(...levels.map((level) => level.order)) + 1;
  };
  const getNextStageOrder = (levelIndex) => {
    if (levelIndex === null || !levels[levelIndex]) return 1;
    const stages = levels[levelIndex].stages;
    if (stages.length === 0) return 1;
    return Math.max(...stages.map((stage) => stage.order)) + 1;
  };
  useEffect(() => {
    if (isAddPlanSuccess || isAddStageSuccess)
      setTimeout(() => {
        navigate("/dashboard/seniorExaminer/plan");
        window.location.reload();
      }, 2000);
  }, [isAddPlanSuccess,isAddStageSuccess]);
  const handleLevelSubmit = (data) => {
    console.log(data, "add level");
    const newLevel = {
      ...data,
      order: source == "add" ? location.state.length + 1 : getNextLevelOrder(),
      stages: [],
    };
    setLevels((prev) => [...prev, newLevel]);
    setActiveLevelIndex(levels.length);
    resetLevelForm();
    setFormState("stage");
  };

  const handleStageSubmit = async (data) => {
    console.log("hi");
    console.log(data, "stage data inside with info", selectedStage);
    let valid = false;
    switch (selectedStage) {
      case "Exam":
        valid = await triggerExam(examFields.map((f) => f.name));
        break;
      case "Task":
        valid = await triggerTask(stageFields.map((f) => f.name));
        break;
      case "Interview":
        valid = await triggerInterview(bookingFields.map((f) => f.name));
        break;
    }
    console.log(valid, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    if (!valid) {
      return;
    }
    const extraInfo =
      selectedStage == "Interview"
        ? {
            interview: { ...getInterviewValues() },
            exam: null,
            tasksPool: null,
          }
        : selectedStage == "Task"
        ? { tasksPool: { ...getTaskValues() }, exam: null, interview: null }
        : { exam: { ...getExamValues() }, tasksPool: null, interview: null };
    console.log(extraInfo);
    if (source == "add-stage") {
      setLevels([
        ...levels,
        {
          ...data,
          order: location.state.length + 1,
          evaluationCriteria: [],
          ...extraInfo,
        },
      ]);
      console.log([...levels, { ...data, evaluationCriteria: [] }]);
      setFormState("criterion");
      setActiveStageIndex(0);
      return;
    }

    const newStage = {
      ...data,
      passingScore: Number(data.passingScore),
      evaluationCriteria: [],
      ...extraInfo,
      order:
        source == "add-stage"
          ? location.state.length + 1
          : getNextStageOrder(activeLevelIndex),
    };

    setLevels((prevLevels) =>
      prevLevels.map((lvl, idx) => {
        if (idx !== activeLevelIndex) return lvl;
        return {
          ...lvl,
          stages: [...lvl.stages, newStage],
        };
      })
    );

    const newStageIndex = levels[activeLevelIndex]?.stages.length || 0;
    setActiveStageIndex(newStageIndex);
    resetStageForm();
    resetInterviewInfo();
    resetTaskInfo();
    resetExamInfo();
    setFormState("criterion");
  };
  console.log(stageAddData, "stageAddData");
  const handleCriterionSubmit = (data) => {
    console.log(data, "add criteria");
    const data1={...data,id:0}
    const criteria =
      source != "add-stage"
        ? levels[activeLevelIndex].stages[activeStageIndex].evaluationCriteria
        : levels[activeStageIndex].evaluationCriteria;
    if (criteria) {
      if (criteria.length != 0) {
        const w = getTotalWeight();
        const result = w + Number(data.weight) > 100;
        if (result) {
          setIsWeightValid("Please Enter valid weight");
          return;
        }
      }
      const newCriterion = {
        ...data,
        weight: Number(data.weight),
      };
      console.log(levels, "jj");
      if (source == "add-stage") {
        // setLevels([{...levels,criteria:[...data]}])
        console.log(
          [{ ...levels[0], criteria: [...levels[0].evaluationCriteria, data] }],
          "test66"
        );
        setLevels([
          {
            ...levels[0],
            evaluationCriteria: [...levels[0].evaluationCriteria, data1],
          },
        ]);
        resetCriterionForm();
        return;
      }
      setLevels((prevLevels) =>
        prevLevels.map((lvl, lvlIdx) => {
          if (lvlIdx !== activeLevelIndex) return lvl;
          return {
            ...lvl,
            stages: lvl.stages.map((stg, stgIdx) => {
              if (stgIdx !== activeStageIndex) return stg;
              return {
                ...stg,
                evaluationCriteria: [...stg.evaluationCriteria, newCriterion],
              };
            }),
          };
        })
      );
      resetCriterionForm();
    }
  };
  const addAnotherStage = () => {
    setFormState("stage");
    resetStageForm();
  };

  const addAnotherLevel = () => {
    setFormState("level");
    resetLevelForm();
  };
  const getTotalWeight = () => {
    const currentStage =
      source != "add-stage"
        ? levels[activeLevelIndex]?.stages[activeStageIndex]
        : levels[activeStageIndex];
    if (currentStage.length == 0) return 0;
    return currentStage.evaluationCriteria.reduce(
      (sum, crit) => sum + crit.weight,
      0
    );
  };
  const activeStageHasCriteria = () => {
    const currentStage =
      source != "add-stage"
        ? levels[activeLevelIndex]?.stages[activeStageIndex]
        : levels[activeStageIndex];
    return currentStage.evaluationCriteria.length > 0;
  };
  const savePlan = () => {
    console.log("Saving plan:", levels);
    // console.log("Saving plan2:", {
    //   trackId: location.state.track.id,
    //   trackName: location.state.track.name,
    //   levels: [...levels],
    // });
    if (source == "add" || source == "define") {
      addPlan({
        trackId: location.state.track.id,
        trackName: location.state.track.name,
        levels: [...levels],
      });
    } else if (source == "add-stage") {
      console.log("add stage", {
        mainStage: { ...levels },
        // additionalStages: [],
      });
      console.log("add stage", location.state.level.id);
      addStage({
        info: [...levels ],
        id: location.state.level.id,
      });
    }
  };

  const renderForm = () => {
    switch (formState) {
      case "level":
        return (
          <>
            {activeLevelIndex == -1 && (
              <div className="p-5">
                <Back
                  text="Back to Plan"
                  onClick={() => navigate("/dashboard/seniorExaminer/plan")}
                />
              </div>
            )}
            <div className="flex items-center min-h-[70vh]">
              <div className="w-[80%] sm:[450px] md:w-[500px] lg:w-[600px] mx-auto bg-white rounded-2xl shadow-xl p-8 mt-12 ">
                <h2 className="text-[20px] md:text-2xl lg:text-3xl font-bold text-gray-800 mb-6  text-center">
                  Add Level{" "}
                  {source == "add"
                    ? location.state.length
                    : getNextLevelOrder()}
                </h2>
                <form
                  onSubmit={handleSubmitLevel(handleLevelSubmit)}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-[12px] sm:text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...registerLevel("name", {
                        required: "Level name is required",
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none placeholder:text-sm "
                      placeholder="Enter level name"
                    />
                    {levelErrors.name && (
                      <div className="flex items-center gap-1 text-red-500 m-0 p-0">
                        <FiAlertCircle className="w-4 h-4" />
                        <p className=" text-sm mt-1">
                          {levelErrors.name.message}
                        </p>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-[12px] sm:text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      {...registerLevel("description", {
                        required: "Level description is required",
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none placeholder:text-sm"
                      placeholder="Enter level description"
                      rows={4}
                    />
                    {levelErrors.description && (
                      <div className="flex items-center gap-1 text-red-500 m-0 p-0">
                        <FiAlertCircle className="w-4 h-4" />
                        <p className="text-red-500 text-sm mt-1">
                          {levelErrors.description.message}
                        </p>
                      </div>
                    )}
                  </div>
                  <Button>
                    <BsArrowRight size={18} className="mr-2" /> Continue to Add
                    Stage
                  </Button>
                </form>
              </div>
            </div>
          </>
        );
      case "stage":
        return (
          <div className="px-12 py-3 w-full ">
            <div className="mb-6 flex items-center">
              {source == "add-stage" && (
                <div className="p-2">
                  <Back
                    text="Back to Plan"
                    onClick={() => navigate("/dashboard/seniorExaminer/plan")}
                  />
                  <h2 className="text-[20px] md:text-[26px] font-bold text-gray-800 my-3">
                    <span className="text-blue-600">
                      Add Stage To {location.state.level.name}
                    </span>{" "}
                  </h2>
                </div>
              )}
              {source != "add-stage" &&
                levels[activeLevelIndex].stages.length > 0 && (
                  <div className="ml-3 text-gray-600 text-sm">
                    ({levels[activeLevelIndex].stages.length} stage
                    {levels[activeLevelIndex].stages.length !== 1
                      ? "s"
                      : ""}{" "}
                    added)
                  </div>
                )}
            </div>
            {source != "add-stage" && (
              <h2 className="text-[20px] md:text-[26px] font-bold text-gray-800 mb-6">
                <span className="text-blue-600">
                  Add Stage {getNextStageOrder(activeLevelIndex)}
                </span>
              </h2>
            )}
            <form
              onSubmit={handleSubmitStage(handleStageSubmit)}
              className=" grid grid-cols-2 gap-8"
            >
              <div className="space-y-6 ">
                <label className="block text-[12px] sm:text-base font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...registerStage("name", {
                    required: "Passing score is required",
                  })}
                  className="w-full sm:w-[90%]  h-12 px-4 border border-gray-300 rounded-lg outline-none placeholder:text-[10px] sm:placeholder:text-sm"
                />
                <div>
                  <label className="block text-[12px] sm:text-base font-medium text-gray-700 mb-2">
                    Stage Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...registerStage("type", {
                      required: "Stage type is required",
                    })}
                    onChange={(e) => setSelectedStage(e.target.value)}
                    className="w-full sm:w-[90%] h-12 px-4 border border-gray-300 rounded-lg outline-none"
                  >
                    <option value="Interview">Interview</option>
                    <option value="Task">Task</option>
                    <option value="Exam">Exam</option>
                  </select>
                  {stageErrors.type && (
                    <p className="text-red-500 text-sm mt-1">
                      {stageErrors.type.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-[12px] sm:text-base font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...registerStage("description", {
                      required: "Stage description is required",
                    })}
                    className="w-full sm:w-[90%] px-4 py-3 border border-gray-300 rounded-lg outline-none placeholder:text-[10px] sm:placeholder:text-sm"
                    placeholder="Enter stage description"
                    rows={4}
                  />
                  {stageErrors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {stageErrors.description.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-[12px] sm:text-base font-medium text-gray-700 mb-2">
                    Passing Score <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    {...registerStage("passingScore", {
                      required: "Passing score is required",
                      max: {
                        value: 100,
                        message: "Number must be 100 or less",
                      },
                      valueAsNumber: true,
                    })}
                    className="w-full sm:w-[90%]  h-12 px-4 border border-gray-300 rounded-lg outline-none placeholder:text-[10px] sm:placeholder:text-sm"
                    placeholder="Enter passing score"
                  />
                  {stageErrors.passingScore && (
                    <p className="text-red-500 text-sm mt-1">
                      {stageErrors.passingScore.message}
                    </p>
                  )}
                </div>
                <div className="mt-8">
                  <Button>
                    <BsArrowRight size={18} className="mr-2" /> Continue to Add
                    Criteria
                  </Button>
                </div>
              </div>
              <div className="space-y-6 ">
                <label className="block text-[12px] sm:text-sm font-medium text-gray-700 mb-1">
                  No Of Attempts <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...registerStage("noOfAttempts", {
                    required: `${"No Of Attempts"} is required`,
                    valueAsNumber: true,
                  })}
                  max={3}
                  min={1}
                  className="w-full sm:w-[90%] h-12 px-4 border border-gray-300 rounded-lg outline-none placeholder:text-[10px] sm:placeholder:text-sm"
                  placeholder={`Enter No Of Attempts`}
                />
                {selectedStage == "Task"
                  ? stageFields.map((field) => (
                      <div key={field.name} className="mb-4">
                        <label className="block text-[12px] sm:text-sm font-medium text-gray-700 mb-1">
                          {field.label} <span className="text-red-500">*</span>
                        </label>

                        {field.name === "description" ||
                        field.name === "requirements" ? (
                          <textarea
                            {...handleTaskInfo(field.name, {
                              required: `${field.label} is required`,
                            })}
                            className="w-full sm:w-[90%] px-4 py-3 border border-gray-300 rounded-lg outline-none placeholder:text-[10px] sm:placeholder:text-sm"
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            rows={4}
                          />
                        ) : (
                          <input
                            type="number"
                            {...handleTaskInfo(field.name, {
                              required: `${field.label} is required`,
                              valueAsNumber: true,
                            })}
                            className="w-full sm:w-[90%] h-12 px-4 border border-gray-300 rounded-lg outline-none placeholder:text-[10px] sm:placeholder:text-sm"
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                          />
                        )}

                        {TaskInfoErrors[field.name] && (
                          <div className="flex items-center gap-1 text-red-500 m-0 p-0">
                            <FiAlertCircle className="w-4 h-4" />
                            <p className=" text-sm mt-1">
                              {TaskInfoErrors[field.name].message}
                            </p>
                          </div>
                        )}
                      </div>
                    ))
                  : selectedStage == "Interview"
                  ? bookingFields.map((field) => (
                      <div key={field.name} className="mb-4">
                        <label className="block text-[12px] sm:text-sm font-medium text-gray-700 mb-1">
                          {field.label} <span className="text-red-500">*</span>
                        </label>
                        {field.type === "textarea" ? (
                          <textarea
                            {...handleInterviewInfo(field.name, {
                              required: `${field.label} is required`,
                            })}
                            className="w-full sm:w-[90%] px-4 py-3 border border-gray-300 rounded-lg outline-none placeholder:text-[10px] sm:placeholder:text-sm"
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            rows={4}
                          />
                        ) : (
                          <input
                            type="number"
                            {...handleInterviewInfo(field.name, {
                              required: `${field.label} is required`,
                              valueAsNumber: true,
                            })}
                            className="w-full sm:w-[90%] h-12 px-4 border border-gray-300 rounded-lg outline-none placeholder:text-[10px] sm:placeholder:text-sm"
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                          />
                        )}

                        {interviewInfoErrors[field.name] && (
                          <div className="flex items-center m-0 p-0 gap-1 text-red-500 ">
                            <FiAlertCircle className="w-4 h-4" />
                            <p className=" text-sm mt-1">
                              {interviewInfoErrors[field.name].message}
                            </p>
                          </div>
                        )}
                      </div>
                    ))
                  : examFields.map((field) => (
                      <div key={field.name} className="mb-4">
                        <label className="block text-[12px] sm:text-sm font-medium text-gray-700 mb-1">
                          {field.label} <span className="text-red-500">*</span>
                        </label>
                        {field.name == "durationMinutes" && (
                          <input
                            type="number"
                            {...handleExamInfo(field.name, {
                              required: `${field.label} is required`,
                              valueAsNumber: true,
                            })}
                            className="w-full sm:w-[90%] h-12 px-4 border border-gray-300 rounded-lg outline-none placeholder:text-[10px] sm:placeholder:text-sm"
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                          />
                        )}
                        {field.name != "durationMinutes" && (
                          <select
                            {...handleExamInfo(field.name, {
                              required: `${field.label} is required`,
                            })}
                            multiple={field.multiple}
                            className="w-full sm:w-[90%] h-14 px-4 border border-gray-300 rounded-lg outline-none text-sm"
                          >
                            {!field.multiple && (
                              <option value="" hidden>
                                Select {field.label.toLowerCase()}
                              </option>
                            )}
                            {field.options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        )}
                        {examInfoErrors[field.name] && (
                          <div className="flex items-center gap-1 text-red-500 m-0 p-0">
                            <FiAlertCircle className="w-4 h-4" />
                            <p className=" text-sm mt-1">
                              {examInfoErrors[field.name].message}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
              </div>
            </form>
          </div>
        );
      case "criterion": {
        const currentStage =
          source != "add-stage"
            ? levels[activeLevelIndex].stages[activeStageIndex]
            : levels[activeStageIndex];
        const criteriaList = currentStage?.evaluationCriteria;
        const totalWeight = getTotalWeight();
        const nextCriterionOrder = currentStage?.evaluationCriteria?.length + 1;
        const hasCriteria = activeStageHasCriteria();
        const weightIs100 = totalWeight === 100;
        return (
          <div className="p-12 w-full ">
            <div className="flex justify-between items-center mb-4">
              <div className="hidden sm:block">
                <div className="mt-4 flex flex-row items-center gap-6 ">
                  {source !== "add-stage" && (
                    <button
                      type="button"
                      onClick={addAnotherStage}
                      className={` flex rounded-md text-sm items-center justify-center ${
                        hasCriteria && weightIs100
                          ? "cursor-pointer text-blue-500"
                          : "text-gray-400  cursor-not-allowed"
                      }`}
                      disabled={!hasCriteria || !weightIs100}
                    >
                      <BiPlusCircle className="mr-2" /> Add Another Stage
                    </button>
                  )}
                  {source !== "add" && source !== "add-stage" && (
                    <button
                      type="button"
                      onClick={addAnotherLevel}
                      className={`rounded-md flex text-sm items-center justify-center ${
                        hasCriteria && weightIs100
                          ? "text-blue-500 cursor-pointer"
                          : "text-gray-400 cursor-not-allowed"
                      }`}
                      disabled={!hasCriteria || !weightIs100}
                    >
                      <BiPlusCircle className="mr-2" /> Add Another Level
                    </button>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={savePlan}
                className={` py-2 px-4 rounded-md flex items-center justify-center ${
                  hasCriteria && weightIs100
                    ? "bg-blue-500 text-white font-medium hover:bg-blue-600 cursor-pointer"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
                disabled={!hasCriteria || !weightIs100}
              >
                {(isAddPlanPending || isAddStagePending) ? (
                  <Spinner />
                ) : (
                  <BiPlusCircle className="mr-2" />
                )}{" "}
                {source == "add" && "Add Level"}
                {source == "add-stage" && "Add Stage"}
                {source == "define" && "Publish Plan"}
              </button>
            </div>
            <div className="my-4  flex flex-row items-center gap-6 sm:hidden ">
              {source != "add-stage" && (
                <button
                  type="button"
                  onClick={addAnotherStage}
                  className={` flex rounded-md text-sm items-center justify-center ${
                    hasCriteria && weightIs100
                      ? "cursor-pointer text-blue-500"
                      : "text-gray-400  cursor-not-allowed"
                  }`}
                  disabled={!hasCriteria || !weightIs100}
                >
                  <BiPlusCircle className="mr-2" /> Add Another Stage
                </button>
              )}
              {source !== "add" && source != "add-stage" && (
                <button
                  type="button"
                  onClick={addAnotherLevel}
                  className={`rounded-md flex text-sm items-center justify-center ${
                    hasCriteria && weightIs100
                      ? "text-blue-500 cursor-pointer"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!hasCriteria || !weightIs100}
                >
                  <BiPlusCircle className="mr-2" /> Add Another Level
                </button>
              )}
            </div>
            <div className="mb-6 flex  flex-wrap gap-2">
              <div className="w-[80%]  justify-center lg:gap-y-8  lg:flex lg:flex-col xl:flex-row xl:justify-between xl:items-center ">
                <div className="flex flex-col items-start md:flex-row gap-3 md:items-center">
                  <div className="bg-blue-100 text-blue-800 px-5 py-1 rounded-md text-sm ">
                    Level{" "}
                    {source == "add-stage"
                      ? location.state.level.order
                      : source == "add"
                      ? location.state.length
                      : levels[activeLevelIndex].order}
                    {source != "add-stage" && ":"}{" "}
                    {source !== "add-stage" && levels[activeLevelIndex].name}
                  </div>
                  {source !== "add-stage" && (
                    <div className="bg-green-100 text-green-800 px-5 py-1 rounded-md text-sm">
                      Stage {currentStage.order}: {currentStage.type}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {!weightIs100 && (
              <h2 className="text-xl font-semibold  mb-4">
                Add Criteria ({nextCriterionOrder})
              </h2>
            )}

            {criteriaList.length > 0 && (
              <div className="mb-6">
                <div
                  className={`flex justify-between mb-2 ${
                    weightIs100 ? "w-[100%]" : "w-[75%]"
                  }`}
                >
                  <div className="text-sm font-medium">Current Criteria</div>
                  <div className="text-sm font-medium">
                    Total Weight: {totalWeight}%
                    {totalWeight !== 100 && totalWeight > 0 && (
                      <span
                        className={
                          totalWeight < 100
                            ? "text-blue-400 text-[12px] ml-1"
                            : "text-red-500 ml-1"
                        }
                      >
                        (Total Should 100)
                      </span>
                    )}
                    {totalWeight === 100 && (
                      <span className="text-green-500 ml-1">&#x2713;</span>
                    )}
                  </div>
                </div>
                <ul className="space-y-2 mt-3">
                  {criteriaList.map((crit, index) => (
                    <li
                      key={index}
                      className={`p-4 bg-gray-100 rounded-md ${
                        weightIs100 ? "w-[100%]" : "w-[75%]"
                      }`}
                    >
                      <div className="font-medium">
                        {index + 1}. {crit.name} ({crit.weight})
                      </div>
                      {crit.description && (
                        <div className="text-sm text-gray-600">
                          {crit.description}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {!weightIs100 && (
              <form onSubmit={handleSubmitCriterion(handleCriterionSubmit)}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...registerCriterion("name", {
                      required: "name is required",
                    })}
                    className="w-[75%] px-3 py-2 border border-gray-300 rounded-md outline-none placeholder:text-sm"
                    placeholder="Enter name"
                  />
                  {criterionErrors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {criterionErrors.name.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...registerCriterion("description", {
                      required: "description is required",
                    })}
                    className="w-[75%] px-3 py-2 border border-gray-300 rounded-md outline-none placeholder:text-sm"
                    placeholder="Enter description"
                    rows={3}
                  />
                  {criterionErrors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {criterionErrors.description.message}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    {...registerCriterion("weight", {
                      required: "Weight is required",
                      valueAsNumber: true,
                    })}
                    className="w-[75%] px-3 py-2 border border-gray-300 rounded-md outline-none placeholder:text-sm"
                    placeholder="Enter weight "
                  />
                  {criterionErrors.weight && (
                    <p className="text-red-500 text-sm mt-1">
                      {criterionErrors.weight.message}
                    </p>
                  )}
                  {totalWeight < 100 && (
                    <p className="text-sm text-blue-600 mt-1">
                      Remaining weight: {100 - totalWeight}%
                    </p>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="px-5 py-2 cursor-pointer text-white text-sm rounded-md bg-blue-500 flex items-center justify-center"
                  >
                    <BiPlusCircle size={18} className="mr-2" /> Add This
                    Criteria
                  </button>
                </div>
              </form>
            )}
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <>
      {isAddStageSuccess && <Alert message="Stage Add Successfully " />}
      {isAddStageError && <Alert type="error" message="Request Fail" />}
      {isAddPlanSuccess && <Alert message="Plan Add Successfully " />}
      {isAddPlanError && <Alert type="error" message="Request Fail" />}
      {isWeightValid && <Alert type="error" message={isWeightValid} />}
      <main className={`mx-auto container `}>{renderForm()}</main>
    </>
  );
}
