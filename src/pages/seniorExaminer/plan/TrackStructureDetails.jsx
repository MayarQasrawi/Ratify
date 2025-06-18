import React, { useEffect, useRef, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { FiEdit2, FiTrash2, FiAlertTriangle } from "react-icons/fi";
import { FaCalendarAlt, FaClock, FaInfoCircle } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/shared/modal/Modal";
import ConfirmationModal from "../../../components/shared/modal/ConfirmationModal";
import Accordion from "../../../components/seniorExaminer/plan/Accordion";
import Alert from "../../../components/shared/Alert";
import useDeletePlanStructer from "../../../hooks/seniorExaminer/plan/useDeletePlanStructer";
import Title from "../../../components/admin/shared/Title";
import EditPlanModal from "../../../components/seniorExaminer/plan/mangePlan/EditPlanModal";
import AddCriteriaModal from "../../../components/seniorExaminer/plan/mangePlan/AddCriteriaModal";
import DeleteCritera from "../../../components/seniorExaminer/plan/mangePlan/DeleteCritera";
import useUpdatePlan from "../../../hooks/seniorExaminer/plan/useUpdatePlan";
import useRestorePlanStructer from "../../../hooks/seniorExaminer/plan/useRestorePlanStructer";
import useUpdateStageDetails from "../../../hooks/seniorExaminer/plan/useUpdateStageDetails";
import EditStageDetailsModal from "../../../components/seniorExaminer/plan/mangePlan/EditStageDetailsModal";
const initialPlan = {
  name: "Backend Development",
  levels: [
    {
      id: "lvl1",
      name: "Junior",
      description: "Entry‑level candidates",
      order: 1,
      isActive: true,

      stages: [
        {
          id: "stg1111",
          noOfattempts: 2,
          name: "Initial Assessment kkkkkkkkkkkkkkkkkkkkk",
          type: "Interview",
          description: "Phone screen abrarkkkkkkkkkkkkkkkkkkkk",
          passingScore: 50,
          order: 1,
          isActive: false,
          exam: null,
          interview: {
            id: 1,
            stageId: 1,
            maxDaysToBook: 20,
            durationMinutes: 45,
            instructions:
              "Please ensure you have a stable internet connection and a quiet environment for the interview. Be prepared to discuss your knowledge in backend development, problem-solving approaches, and related technologies.",
            isActive: true,
          },
          tasksPool: null,
          evaluationCriteria: [
            {
              id: "c1",
              name: "clear",
              description: "Clarity of answers",
              weight: 20,
            },
            {
              id: "c2",
              name: "Experience2",
              description: "Relevant background",
              weight: 20,
            },
            {
              id: "c3",
              name: "communicatin",
              description: "Relevant background",
              weight: 20,
            },
            {
              id: "c4",
              name: "clear code",
              description: "Relevant background",
              weight: 20,
            },
            {
              id: "c5",
              name: "use semantic tag",
              description: "Relevant background",
              weight: 20,
            },
          ],
        },
        {
          id: "stg2",
          type: "Interview",
          name: "Initial Assessment",
          description: "Phone screen",
          passingScore: 50,
          noOfattempts: 3,
          order: 2,
          exam: null,
          interview: {
            id: 2,
            stageId: 1,
            maxDaysToBook: 20,
            durationMinutes: 45,
            instructions:
              "Please ensure you have a stable internet connection and a quiet environment for the interview. Be prepared to discuss your knowledge in backend development, problem-solving approaches, and related technologies.",
            isActive: true,
          },
          tasksPool: null,
          isActive: true,
          evaluationCriteria: [
            {
              id: "c1",
              name: "Communication",
              description: "Clarity of answers",
              weight: 50,
            },
            {
              id: "c2",
              name: "Experience",
              description: "Relevant background",
              weight: 50,
            },
          ],
        },
      ],
    },
    {
      id: "lvl2",
      name: "Senior",
      description: "Experienced hires",
      order: 2,
      isActive: true,
      stages: [
        {
          id: "stg2",
          type: "Task",
          name: "Initial Assessment",
          noOfattempts: 1,
          description: "Coding challenge",
          passingScore: 70,
          order: 1,
          isActive: true,
          tasksPool: {
            id: 1,
            stageId: 3,
            daysToSubmit: 2,
            description: "bhhh",
            requirements: "hhhhhhhhh",
            isActive: false,
          },
          exam: null,
          interview: null,
          evaluationCriteria: [
            {
              id: "c3",
              name: "Correctness",
              description: "Bug‑free solution",
              weight: 60,
            },
            {
              id: "c4",
              name: "Efficiency",
              description: "Optimal performance",
              weight: 40,
            },
          ],
        },
      ],
    },
    {
      id: "lvl3",
      name: "Junior",
      description: "Entry‑level candidates",
      order: 1,
      isActive: false,
      stages: [
        {
          id: "stg9",
          name: "Initial Assessment",
          type: "Interview",
          description: "Phone screen",
          passingScore: 50,
          noOfattempts: 2,
          order: 1,
          isActive: false,
          exam: null,
          interview: {
            id: 3,
            stageId: 1,
            maxDaysToBook: 20,
            durationMinutes: 45,
            instructions:
              "Please ensure you have a stable internet connection and a quiet environment for the interview. Be prepared to discuss your knowledge in backend development, problem-solving approaches, and related technologies.",
            isActive: true,
          },
          tasksPool: null,
          evaluationCriteria: [
            {
              id: "c1",
              name: "clear",
              description: "Clarity of answers",
              weight: 20,
            },
            {
              id: "c2",
              name: "Experience2",
              description: "Relevant background",
              weight: 20,
            },
            {
              id: "c3",
              name: "communicatin",
              description: "Relevant background",
              weight: 20,
            },
            {
              id: "c4",
              name: "clear code",
              description: "Relevant background",
              weight: 20,
            },
            {
              id: "c5",
              name: "use semantic tag",
              description: "Relevant background",
              weight: 20,
            },
          ],
        },
        {
          id: "stg2",
          type: "Interview",
          name: "Initial Assessment",
          description: "Phone screen",
          passingScore: 50,
          order: 2,
          noOfattempts: 2,
          isActive: false,
          exam: null,
          interview: {
            id: 1,
            stageId: 4,
            maxDaysToBook: 20,
            durationMinutes: 45,
            instructions:
              "Please ensure you have a stable internet connection and a quiet environment for the interview. Be prepared to discuss your knowledge in backend development, problem-solving approaches, and related technologies.",
            isActive: true,
          },
          tasksPool: null,
          evaluationCriteria: [
            {
              id: "c1",
              name: "Communication",
              description: "Clarity of answers",
              weight: 50,
            },
            {
              id: "c2",
              name: "Experience",
              description: "Relevant background",
              weight: 50,
            },
          ],
        },
      ],
    },
  ],
};

export default function TrackStructureDetails({ structure }) {
  const [plan, setPlan] = useState(structure || initialPlan);
  console.log(structure, "structure......................");
  const navigate = useNavigate();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const levelIndex = useRef();
  const stageIndex = useRef();
  const criteriaIndex = useRef();
  const [selectedAction, setSelectedAction] = useState();
  const [itemToEdit, setItemToEdit] = useState(null);
  const [editType, setEditType] = useState("");
  const [deleteCriteria, setDeleteCriteria] = useState(false);
  const [addCriteria, setAddCriteria] = useState();
  const [selectedStageDetails, setSelectedStageDetails] = useState();
  console.log(levelIndex?.current, "level", stageIndex.current, "stage jjj");
  const {
    data: updatePlanStructer,
    error: updateError,
    isError,
    mutateAsync,
    isPending,
    isSuccess,
  } = useUpdatePlan();
  const {
    isPending: isDeletePending,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    data,
    mutate: deletePlanStructer,
    error: deleteError,
    reset: resetDeletePlan,
  } = useDeletePlanStructer();
  const {
    data: updateStageDetails,
    error: updateStageError,
    isError: isUpdateStage,
    mutateAsync: updateStagesDetails,
    isPending: isStageDetailsPending,
    isSuccess: isStageDetailsSuccess,
  } = useUpdateStageDetails();
  const {
    isPending: isActivatePending,
    isSuccess: isActivateSuccess,
    isError: isActivateError,
    mutate: ActivatePlanStructer,
    error: activateError,
    reset: resetActivate,
  } = useRestorePlanStructer();
  const handleEditLevel = ({ id, name, order, description, isActive }) => {
    setItemToEdit({ id, name, order, description, isActive });
    setEditType("level");
    setUpdateModalOpen(true);
  };

  const handleEditStage = ({
    id,
    description,
    type,
    passingScore,
    order,
    name,
    isActive,
    noOfattempts,
  }) => {
    console.log(
      {
        id,
        description,
        type,
        passingScore,
        order,
        name,
        isActive,
        noOfattempts,
      },
      "edit stage "
    );
    setItemToEdit({
      id,
      description,
      type,
      passingScore,
      order,
      name,
      isActive,
      noOfattempts,
    });
    setEditType("stage");
    setUpdateModalOpen(true);
  };

  const handleEditCriteria = (cri) => {
    console.log(cri,'handle edit cri');
    setItemToEdit({ ...cri });
    setEditType("criteria");
    setUpdateModalOpen(true);
  };

  const handleUpdateSubmit = async () => {
    try {
      console.log(
        itemToEdit,
        "update//////////////description///////////////////////////"
      );
      switch (editType) {
        case "level":
          await mutateAsync({
            endpoint: `Levels/${itemToEdit.id}`,
            payload: {
              name: itemToEdit.name,
              description: itemToEdit.description,
              order: itemToEdit.order,
              isActive: itemToEdit.isActive,
            },
          });
          window.location.reload();
          break;
        case "stage":
          await mutateAsync({
            endpoint: `Stages/${itemToEdit.id}`,
            payload: {
              name: itemToEdit.name,
              description: itemToEdit.description,
              order: itemToEdit.order,
              isActive: itemToEdit.isActive,
              type: itemToEdit.type,
              passingScore: itemToEdit.passingScore,
              noOfattempts: itemToEdit.noOfattempts,
            },
          });
          window.location.reload();
          break;
        case "criteria":
          await mutateAsync({ endpoint: `EvaluationCriteria/${itemToEdit.id}`, payload: itemToEdit });
          window.location.reload();
          break;
      }
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setUpdateModalOpen(false);
      setItemToEdit(null);
    }
  };
  const handleAddCriteria = () => {
    setDeleteCriteria(false);
    setAddCriteria(true);
  };
  const handleStagesInfo = (extraInfo, type) => {
    console.log(extraInfo, "extraInfo", type);
    setSelectedStageDetails({ ...extraInfo, type });
  };
  const handleStageDetailsSubmit = async (data, type) => {
    console.log("stage details page rrrrrrrrrrrrrrrrrrr", data);
    try {
      switch (type) {
        case "Task":
          await updateStagesDetails({ endpoint: "TasksPool", payload: data });
          break;
        case "Exam":
          await updateStagesDetails({ endpoint: "Exams", payload: data });
          break;
        case "Interview":
          await updateStagesDetails({ endpoint: "Interviews", payload: data });
          break;
        default:
          throw new Error(`Unknown stage type: ${type}`);
      }
      window.location.reload();
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setSelectedStageDetails(null);
    }
  };
  console.log(structure, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");

  return (
    <>
      {(isSuccess || isStageDetailsSuccess) && (
        <Alert message="Updated successfully" />
      )}
      {(isError || isUpdateStage) && (
        <Alert type="error" message="Update failed" />
      )}
      <div>
        {open && (
          <Modal>
            <ConfirmationModal
              view={true}
              Cancle={() => {
                setOpen(false);
                stageIndex.current = null;
                levelIndex.current = null;
                resetDeletePlan();
              }}
              isPending={isDeletePending}
              isSuccess={isDeleteSuccess}
              isError={isDeleteError}
              error={deleteError}
              data={data}
              Confirm={() =>
                stageIndex.current
                  ? deletePlanStructer(`Stages/${stageIndex.current.id}`, {
                      onSuccess: () => {
                        window.location.reload();
                      },
                    })
                  : deletePlanStructer(`Levels/${levelIndex.current.id}`, {
                      onSuccess: () => {
                        window.location.reload();
                      },
                    })
              }
            >
              Are you sure you want to delete{" "}
              {!stageIndex.current ? (
                `${levelIndex.current.name} Level ?`
              ) : (
                <>
                  <span>{stageIndex.current.type} ?</span>
                </>
              )}
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-md mt-4">
                &#9888; Deleting this {stageIndex.current ? "stage" : "level"}{" "}
                will also permanently remove <strong>all criteria</strong>{" "}
                associated with it {!stageIndex.current && "and stages"}.
              </p>
            </ConfirmationModal>
          </Modal>
        )}
        {selectedAction == "toggle" && (
          <Modal>
            <ConfirmationModal
              view={true}
              Cancle={() => {
                setSelectedAction(null);
                stageIndex.current = null;
                levelIndex.current = null;
                resetActivate();
              }}
              Confirm={() =>
                stageIndex.current
                  ? ActivatePlanStructer(
                      `Stages/${stageIndex.current.id}/restore`
                    )
                  : ActivatePlanStructer(
                      `Levels/${levelIndex.current.id}/restore`
                    )
              }
              isPending={isActivatePending}
              isSuccess={isActivateSuccess}
              isError={isActivateError}
            >
              Are you sure you want to Activate{" "}
              {!stageIndex.current ? (
                `${levelIndex.current.name} Level ?`
              ) : (
                <>
                  <span>{stageIndex.current.type} ?</span>
                </>
              )}
            </ConfirmationModal>
          </Modal>
        )}
        {updateModalOpen && (
          <Modal>
            <EditPlanModal
              editType={editType}
              onClose={() => {
                setUpdateModalOpen(false);
                setItemToEdit(null);
              }}
              itemToEdit={itemToEdit}
              onUpdate={handleUpdateSubmit}
              isPending={isPending}
              setItemToEdit={setItemToEdit}
            />
          </Modal>
        )}
        {selectedStageDetails && (
          <Modal>
            <EditStageDetailsModal
              editType={selectedStageDetails.type}
              onClose={() => {
                setSelectedStageDetails(null);
              }}
              itemToEdit={selectedStageDetails}
              onUpdate={handleStageDetailsSubmit}
              isPending={isStageDetailsPending}
              setItemToEdit={setSelectedStageDetails}
            />
          </Modal>
        )}
        {addCriteria && (
          <Modal>
            <AddCriteriaModal
              onCancel={() => {
                setAddCriteria(false);
                criteriaIndex.current = null;
                levelIndex.current = null;
                stageIndex.current = null;
              }}
              current={criteriaIndex}
              stage={stageIndex.current}
            />
          </Modal>
        )}
        {deleteCriteria && (
          <Modal>
            <DeleteCritera
              onClose={() => {
                setDeleteCriteria(false);
                criteriaIndex.current = null;
                levelIndex.current = null;
                stageIndex.current = null;
              }}
              criteriaIndex={criteriaIndex}
              handleAddCriteria={handleAddCriteria}
              stageIndex={stageIndex}
              levelIndex={levelIndex}
            />
          </Modal>
        )}
        <div className="p-3  max-w-5xl ">
          <div className="my-3 ">
            <Title> {plan.name} Assessment Plan</Title>
          </div>
          <div className="mb-6">
            <button
              className="cursor-pointer flex items-center font-medium text-[var(--text-color)] hover:text-[var(--main-color)]   transition-colors "
              onClick={() =>
                navigate("/dashboard/seniorExaminer/plan-setup", {
                  state: {
                    source: "add",
                    length: plan.levels.length + 1,
                    track: {name: plan.name, id: plan.id },
                  },
                })
              }
            >
              <BiPlusCircle className="mr-2" size={20} /> Add Level
            </button>
          </div>
          <div className="space-y-6">
            {plan.levels.map((lvl, i) => (
              <Accordion
                key={lvl.id}
                isActive={lvl.isActive}
                title={
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">{`Level ${lvl.order}: ${lvl.name}`}</span>
                    {lvl.isActive && (
                      <div className="flex items-center ml-1">
                        <button
                          onClick={() => {
                            handleEditLevel(lvl);
                          }}
                          className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors mr-2"
                        >
                          <AiOutlineEdit size={18} className="cursor-pointer" />
                        </button>
                      </div>
                    )}
                  </div>
                }
                description={lvl.description}
                onDelete={() => {
                  if (lvl.isActive) setOpen(true);
                  else setSelectedAction("toggle");
                  levelIndex.current = lvl;
                }}
              >
                <div className="mb-4 mt-2">
                  <button
                    className="flex items-center  text-green-500 dark:text-green-700 dark:hover:bg-gray-600 rounded-md text-sm px-4 py-2 cursor-pointer hover:bg-green-50 transition-colors "
                    onClick={() =>
                      navigate("/dashboard/seniorExaminer/plan-setup", {
                        state: {
                          source: "add-stage",
                          length: plan.levels[i].stages.length,
                          level: plan.levels[i],
                        },
                      })
                    }
                  >
                    <BiPlusCircle className="mr-2" size={16} /> Add Stage
                  </button>
                </div>
                <div className="pl-4">
                  {lvl.stages.map((stg, j) => (
                    <Accordion
                      key={stg.id}
                      ind={true}
                      length={lvl.stages.length}
                      isActive={stg.isActive}
                      title={
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium">{`Stage ${stg.order}: ${stg.type}`}</span>
                          {stg.isActive && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center"
                            >
                              <button
                                onClick={() => handleEditStage(stg)}
                                className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors mr-2"
                              >
                                <FiEdit2 size={16} className="cursor-pointer" />
                              </button>
                            </div>
                          )}
                        </div>
                      }
                      description={
                        <>
                          {stg.description}{" "}
                          <div className="p-4 my-5 rounded-lg bg-[var(--sidebar-bg)]  shadow-md flex items-center justify-between">
                            <div>
                              {stg.type == "Interview" && (
                                <div className="flex items-center mb-2 text-gray-900 dark:text-white">
                                  <FaCalendarAlt className="mr-2" />
                                  <span>
                                    Max Day To Booking:{" "}
                                    <strong>
                                      {stg.interview.maxDaysToBook}
                                    </strong>
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center mb-2 gap-1.5 text-gray-900 dark:text-white">
                                <FaClock />
                                <span>
                                  Duration:
                                  <strong>
                                    {stg.type == "Interview"
                                      ? `${stg.interview.durationMinutes}mins`
                                      : stg.type == "Task"
                                      ? ` ${stg.tasksPool.daysToSubmit} days`
                                      : `${stg.exam.durationMinutes}mins`}
                                  </strong>
                                </span>
                              </div>
                              {stg.type != "Exam" && (
                                <div className="flex items-start text-gray-700 text-justify">
                                  <FaInfoCircle className="mr-2 mt-1" />
                                  <p>
                                    {stg.type == "Interview"
                                      ? stg.interview.instructions
                                      : stg.tasksPool.requirements}
                                  </p>
                                </div>
                              )}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStagesInfo(
                                  stg.type === "Interview"
                                    ? stg.interview
                                    : stg.type === "Exam"
                                    ? stg.exam
                                    : stg.tasksPool,
                                  stg.type
                                );
                              }}
                              className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors mr-2"
                            >
                              <FiEdit2 size={18} className="cursor-pointer" />
                            </button>
                          </div>
                        </>
                      }
                      badge={`Passing Score: ${stg.passingScore}%`}
                      onDelete={() => {
                        if (stg.isActive) setOpen(true);
                        else setSelectedAction("toggle");
                        levelIndex.current = lvl;
                        stageIndex.current = stg;
                      }}
                    >
                      <div className="bg-[var(--sidebar-bg)] dark:border-gray-700 p-5 rounded-lg mt-2 border border-blue-100">
                        <h4 className="font-medium mb-4 text-gray-800 flex items-center dark:text-white">
                          <span className="w-1 h-5 bg-blue-500 rounded-full mr-2 "></span>
                          Evaluation Criteria
                        </h4>
                        <div className="space-y-3 ">
                          {stg.evaluationCriteria.filter(cr =>cr.isActive==true).map((crit, k) => (
                            <div
                              key={crit.id}
                              className="bg-white dark:border-gray-700 dark:bg-gray-600 p-4 rounded-lg shadow-sm flex justify-between items-start border border-gray-100 hover:shadow-md transition-shadow scrollbar-custom overflow-y-auto"
                            >
                              <div className="flex-1">
                                <div className="font-medium text-gray-800 dark:text-white capitalize">
                                  {crit.name}
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                  {crit.description}
                                </div>
                                <div className="flex items-center mt-3">
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-blue-600 h-2 rounded-full transition-all"
                                      style={{ width: `${crit.weight}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs font-medium text-gray-700 ml-3 min-w-[40px] dark:text-white">
                                    {crit.weight}%
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center ml-2">
                                <button
                                  onClick={() => handleEditCriteria(crit)}
                                  className="p-1.5 text-blue-500 hover:text-blue-700 dark:text-blue-700 hover:bg-blue-50 dark:hover:bg-white rounded-full transition-colors mr-1"
                                >
                                  <FiEdit2
                                    size={16}
                                    className="cursor-pointer"
                                  />
                                </button>
                                {stg.evaluationCriteria.filter(cr =>cr.isActive==true).length >1 &&   <button
                                  onClick={() => {
                                    setDeleteCriteria(true);
                                    levelIndex.current = lvl;
                                    criteriaIndex.current = crit;
                                    stageIndex.current = stg.id;
                                  }}
                                  className="p-1.5 text-red-500 dark:text-red-700 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors dark:hover:bg-white"
                                >
                                  <FiTrash2
                                    size={16}
                                    className="cursor-pointer"
                                  />
                                </button>}
                             
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Accordion>
                  ))}
                </div>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
