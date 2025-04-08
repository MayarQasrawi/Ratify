import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsArrowRight } from "react-icons/bs";
import { BiPlusCircle, BiSave } from "react-icons/bi";
import Button from "../../../components/seniorExaminer/plan/Button";
import Alert from '../../../components/shared/Alert'

export default function PlanSetup() {
  const [levels, setLevels] = useState([]);
  const [formState, setFormState] = useState("level");
  const [isWeightValid, setIsWeightValid] = useState(null);
  const [activeLevelIndex, setActiveLevelIndex] = useState(null);
  const [activeStageIndex, setActiveStageIndex] = useState(null);
useEffect(()=>{
if(isWeightValid)
  setTimeout(()=>setIsWeightValid(null),1500)
},[isWeightValid])
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

  const handleLevelSubmit = (data) => {
    const newLevel = {
      ...data,
      order: getNextLevelOrder(),
      stages: [],
    };
    setLevels((prev) => [...prev, newLevel]);
    setActiveLevelIndex(levels.length);
    resetLevelForm();
    setFormState("stage");
  };

  const handleStageSubmit = (data) => {
    const newStage = {
      ...data,
      PassingScore: Number(data.PassingScore),
      criteria: [],
      order: getNextStageOrder(activeLevelIndex),
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
    setFormState("criterion");
  };

  const handleCriterionSubmit = (data) => {
   const criteria= levels[activeLevelIndex].stages[activeStageIndex].criteria
   if(criteria){
  if(criteria.length!=0){
   const w= getTotalWeight()
   const result= w+Number(data.Weight)> 100
   if (result){
    setIsWeightValid('Please Enter valid weight')
    return ;}}
  const newCriterion = {
      ...data,
      Weight: Number(data.Weight),
    };
console.log(newCriterion)
    setLevels((prevLevels) =>
      prevLevels.map((lvl, lvlIdx) => {
        if (lvlIdx !== activeLevelIndex) return lvl;
        return {
          ...lvl,
          stages: lvl.stages.map((stg, stgIdx) => {
            if (stgIdx !== activeStageIndex) return stg;
            return {
              ...stg,
              criteria: [...stg.criteria, newCriterion],
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
    const currentStage = levels[activeLevelIndex]?.stages[activeStageIndex];
    if (currentStage.length==0) return 0;
    return currentStage.criteria.reduce((sum, crit) => sum + crit.Weight, 0);
  };
  const activeStageHasCriteria = () => {
    const currentStage = levels[activeLevelIndex]?.stages[activeStageIndex];
    return currentStage.criteria.length > 0;
  };
  const savePlan = () => {
    console.log("Saving plan:", levels);
};


  const renderForm = () => {
    switch (formState) {
      case "level":
        return (
          <div className="w-[80%] sm:[450px] md:w-[500px] lg:w-[600px] mx-auto bg-white rounded-2xl shadow-xl p-8 mt-6 ">
            <h2 className="text-[20px] md:text-2xl lg:text-3xl font-bold text-gray-800 mb-6 text-center">
              Add Level {getNextLevelOrder()}
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none placeholder:text-sm"
                  placeholder="Enter level name"
                />
                {levelErrors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {levelErrors.name.message}
                  </p>
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
                  <p className="text-red-500 text-sm mt-1">
                    {levelErrors.description.message}
                  </p>
                )}
              </div>
              <Button>
                <BsArrowRight size={18} className="mr-2" /> Continue to Add
                Stage
              </Button>
            </form>
          </div>
        );
      case "stage":
        return (
          <div className="p-12 w-full ">
            <div className="mb-6 flex items-center">
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm">
                Level {levels[activeLevelIndex].order}:{" "}
                {levels[activeLevelIndex].name}
              </div>
              {levels[activeLevelIndex].stages.length > 0 && (
                <div className="ml-3 text-gray-600 text-sm">
                  ({levels[activeLevelIndex].stages.length} stage
                  {levels[activeLevelIndex].stages.length !== 1 ? "s" : ""}{" "}
                  added)
                </div>
              )}
            </div>
            <h2 className="text-[20px] md:text-2xl font-bold text-gray-800 mb-6">
              Add Stage {getNextStageOrder(activeLevelIndex)}
            </h2>
            <form
              onSubmit={handleSubmitStage(handleStageSubmit)}
              className="space-y-6"
            >
              <div>
                <label className="block text-[12px] sm:text-base font-medium text-gray-700 mb-2">
                  Stage Type <span className="text-red-500">*</span>
                </label>
                <select
                  {...registerStage("type", {
                    required: "Stage type is required",
                  })}
                  className="w-[100%] sm:w-[75%] h-12 px-4 border border-gray-300 rounded-lg outline-none"
                >
                  <option  hidden>
                    Select a stage type
                  </option>
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
                  className="w-[100%] sm:w-[75%] px-4 py-3 border border-gray-300 rounded-lg outline-none placeholder:text-[10px] sm:placeholder:text-sm"
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
                  max={100}
                  {...registerStage("PassingScore", {
                    required: "Passing score is required",
                    valueAsNumber: true,
                  })}
                  className="w-[100%] sm:w-[75%] h-12 px-4 border border-gray-300 rounded-lg outline-none placeholder:text-[10px] sm:placeholder:text-sm"
                  placeholder="Enter passing score"
                />
                {stageErrors.PassingScore && (
                  <p className="text-red-500 text-sm mt-1">
                    {stageErrors.PassingScore.message}
                  </p>
                )}
              </div>
              <Button>
                <BsArrowRight size={18} className="mr-2" /> Continue to Add
                Criteria
              </Button>
            </form>
          </div>
        );
      case "criterion": {
        const currentStage = levels[activeLevelIndex].stages[activeStageIndex];
        const criteriaList = currentStage.criteria;
        const totalWeight = getTotalWeight();
        const nextCriterionOrder = currentStage.criteria.length+1
        const hasCriteria = activeStageHasCriteria();
        const weightIs100 = totalWeight === 100;

        return (
          <div className="p-12 w-full  ">
            <div className="mb-6 flex flex-wrap gap-2">
              <div className="w-[80%] lg:gap-y-8  lg:flex lg:flex-col xl:flex-row justify-between items-center ">
                <div className="flex gap-3 items-center">
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm ">
                    Level {levels[activeLevelIndex].order}:{" "}
                    {levels[activeLevelIndex].name}
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm">
                    Stage {currentStage.order}: {currentStage.type}
                  </div>
                </div>
                <div className="mt-4 flex flex-col items-start lg:flex-row gap-4 ">
                <button
                    type="button"
                    onClick={addAnotherStage}
                    className={` flex  py-2 px-4 rounded-md  items-center justify-center ${
                      hasCriteria && weightIs100
                        ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                        : "bg-gray-400 text-white cursor-not-allowed"
                    }`}
                    disabled={!hasCriteria || !weightIs100}
                  >
                    <BiPlusCircle size={18} className="mr-2" /> Add Another
                    Stage to This Level
                  </button>
                  <button
                    type="button"
                    onClick={addAnotherLevel}
                    className={` py-2 px-4 rounded-md flex items-center justify-center ${
                      hasCriteria && weightIs100
                        ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                        : "bg-gray-400 text-white cursor-not-allowed"
                    }`}
                    disabled={!hasCriteria || !weightIs100}
                  >
                    <BiPlusCircle size={18} className="mr-2" /> Add Another
                    Level
                  </button>
                  <button
                    type="button"
                    onClick={savePlan}
                    className={` py-2 px-4 rounded-md flex items-center justify-center ${
                      hasCriteria && weightIs100
                        ? "bg-gray-800 text-white hover:bg-gray-900 cursor-pointer"
                        : "bg-gray-400 text-white cursor-not-allowed"
                    }`}
                    disabled={!hasCriteria || !weightIs100}
                  >
                    <BiSave size={18} className="mr-2" /> Publish Plan
                  </button>
                </div>
              </div>
            </div>
           {!weightIs100 && <h2 className="text-xl font-semibold  mb-4">
              Add Criteria ({nextCriterionOrder})
            </h2>}
            {criteriaList.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <div className="text-sm font-medium">Current Criteria</div>
                  <div className="text-sm font-medium">
                    Total Weight: {totalWeight}%
                    {totalWeight !== 100 && totalWeight > 0 && (
                      <span
                        className={
                          totalWeight < 100
                            ? "text-orange-500 ml-1"
                            : "text-red-500 ml-1"
                        }
                      >
                        (Should total 100%)
                      </span>
                    )}
                    {totalWeight === 100 && (
                      <span className="text-green-500 ml-1">&#x2713;</span>
                    )}
                  </div>
                </div>
                <ul className="space-y-2 mt-3">
                  {criteriaList.map((crit, index) => (
                    <li key={index} className="p-4 bg-gray-100 rounded-md">
                      <div className="font-medium">
                        {index + 1}. {crit.name} ({crit.Weight})
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
                    {...registerCriterion("Weight", {
                      required: "Weight is required",
                      valueAsNumber: true,
                    })}
                    className="w-[75%] px-3 py-2 border border-gray-300 rounded-md outline-none placeholder:text-sm"
                    placeholder="Enter weight "
                  />
                  {criterionErrors.Weight && (
                    <p className="text-red-500 text-sm mt-1">
                      {criterionErrors.Weight.message}
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
                    Criterion
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
    {isWeightValid && <Alert type='error' message={isWeightValid} />}
    <main className="mx-auto container mt-8 min-h-screen flex items-center ">
      {renderForm()}
    </main>
    </>
  );
}
