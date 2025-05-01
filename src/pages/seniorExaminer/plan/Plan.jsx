import React, { useRef, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { FiEdit2, FiTrash2, FiAlertTriangle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/shared/modal/Modal";
import ConfirmationModal from "../../../components/shared/modal/ConfirmationModal";
import Accordion from "../../../components/seniorExaminer/plan/Accordion";
import useUpdatePlan from "../../../hooks/seniorExaminer/useUpdatePlan";
import Spinner from "../../../components/shared/Spinner";
import Alert from "../../../components/shared/Alert";
import useDeletePlanStructer from "../../../hooks/seniorExaminer/plan/useDeletePlanStructer";

const initialPlan = {
  levels: [
    {
      id: "lvl1",
      name: "Junior",
      description: "Entry‑level candidates",
      order: 1,
      stages: [
        {
          id: "stg1",
          name: "Initial Assessment",
          type: "Interview",
          description: "Phone screen",
          passingScore: 50,
          order: 1,
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
      stages: [
        {
          id: "stg2",
          type: "Task",
          name: "Initial Assessment",
          description: "Coding challenge",
          passingScore: 70,
          order: 1,
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
  ],
};

export default function Plan() {
  const [plan, setPlan] = useState(initialPlan);
  const navigate = useNavigate();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const levelIndex = useRef();
  const stageIndex = useRef();
  const criteriaIndex = useRef();
  const [itemToEdit, setItemToEdit] = useState(null);
  const [editType, setEditType] = useState("");
  const [deleteCriteria, setDeleteCriteria] = useState(false);
  const [option, setOption] = useState(false);
  const [error, setError] = useState("");
  console.log(levelIndex?.current, "level", stageIndex.current, criteriaIndex);
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
  } = useDeletePlanStructer();

  const handleEditLevel = ({ id, name, order, description }) => {
    setItemToEdit({ id, name, order, description });
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
  }) => {
    setItemToEdit({ id, description, type, passingScore, order, name });
    setEditType("stage");
    setUpdateModalOpen(true);
  };

  const handleEditCriteria = (cri) => {
    console.log(cri);
    setItemToEdit({ ...cri });
    setEditType("criteria");
    setUpdateModalOpen(true);
  };

  const handleUpdateSubmit = async () => {
    try {
      console.log(itemToEdit, "update");
      switch (editType) {
        case "level":
          await mutateAsync({ endpoint: "level", payload: itemToEdit });
          break;
        case "stage":
          await mutateAsync({ endpoint: "stage", payload: itemToEdit });
          break;
        case "criteria":
          await mutateAsync({ endpoint: "criteria", payload: itemToEdit });
          break;
      }
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setUpdateModalOpen(false);
      setItemToEdit(null);
    }
  };

  console.log(option);
  return (
    <>
      {isSuccess && <Alert message="Updated successfully" />}
      {isError && <Alert type="error" message="Update failed" />}
      <div>
        {open && (
          <Modal>
            <ConfirmationModal
              view={true}
              Cancle={() => {
                setOpen(false);
                stageIndex.current = null;
                levelIndex.current = null;
              }}
              isPending={isDeletePending}
              isSuccess={isDeleteSuccess}
              isError={isDeleteError}
              error={deleteError}
              data={data}
              Confirm={() =>
                stageIndex.current
                  ? deletePlanStructer(`stage/${stageIndex.current.id}`)
                  : deletePlanStructer(`level/${levelIndex.current.id}`)
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
        {updateModalOpen && (
          <Modal>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[22px] text-[var(--main-color)] font-semibold">
                  {editType === "level"
                    ? "Edit Level"
                    : editType === "stage"
                    ? "Edit Stage"
                    : "Edit Criteria"}
                </h3>
                <button
                  onClick={() => {
                    setUpdateModalOpen(false);
                    setItemToEdit(null);
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors  "
                >
                  <AiOutlineClose size={20} className="cursor-pointer" />
                </button>
              </div>

              {editType === "level" && itemToEdit && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="block w-full border border-gray-300 rounded-md  p-3 outline-none"
                      value={itemToEdit.name}
                      onChange={(e) =>
                        setItemToEdit({ ...itemToEdit, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      className="block w-full border border-gray-300 rounded-md outline-none p-3 "
                      value={itemToEdit.description}
                      rows={3}
                      onChange={(e) =>
                        setItemToEdit({
                          ...itemToEdit,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}

              {editType === "stage" && itemToEdit && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md  p-3 outline-none "
                      value={itemToEdit.description}
                      onChange={(e) =>
                        setItemToEdit({
                          ...itemToEdit,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Passing Score <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      className="w-full p-3 border border-gray-300 rounded-md  outline-none "
                      value={itemToEdit.passingScore}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value > 100) {
                          setError("Score must be 100 or less");
                          setItemToEdit({ ...itemToEdit, PassingScore: 0 });
                        } else {
                          setError("");
                          setItemToEdit({ ...itemToEdit, passingScore: value });
                        }
                      }}
                    />
                    <p className="text-red-500 mt-1 text-xs">{error}</p>
                  </div>
                </div>
              )}
              {editType === "criteria" && itemToEdit && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className=" block w-full border border-gray-300 rounded-md  p-3 outline-none "
                      value={itemToEdit.name}
                      onChange={(e) =>
                        setItemToEdit({ ...itemToEdit, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      className="block w-full border border-gray-300 rounded-md  p-3 outline-none "
                      value={itemToEdit.description}
                      onChange={(e) =>
                        setItemToEdit({
                          ...itemToEdit,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}
              <div className="mt-6 flex justify-end space-x-3">
                {!isPending && (
                  <button
                    onClick={() => setUpdateModalOpen(false)}
                    className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={handleUpdateSubmit}
                  disabled={isPending}
                  className="cursor-pointer disabled:cursor-not-allowed flex items-center gap-0.5 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors "
                >
                  {isPending && <Spinner />} Update
                </button>
              </div>
            </div>
          </Modal>
        )}
        {deleteCriteria && (
          <Modal>
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 animate-slide-up space-y-6 ">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 p-4 rounded-full">
                    <FiAlertTriangle size={28} className="text-yellow-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Delete Criteria
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setDeleteCriteria(false);
                    criteriaIndex.current = null;
                    levelIndex.current = null;
                    stageIndex.current = null;
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <AiOutlineClose size={20} />
                </button>
              </div>
              <p className="text-sm">
                Are you sure you wont to delete{" "}
                <span className="text-blue-500 text-md font-bold">
                  {criteriaIndex.current.name}
                </span>{" "}
                Criteria ?
              </p>
              <div className="space-y-4 max-h-45 overflow-y-auto pr-2 ">
                {[
                  {
                    value: "distribute",
                    title: "Distribute automatically",
                    desc: "Distribute weight proportionally among remaining criteria",
                  },
                  {
                    value: "create",
                    title: "Create new criteria",
                    desc: `Add a new criteria with the same weight (${criteriaIndex.current.weight}%)`,
                  },
                  {
                    value: "manual",
                    title: "Manual adjustment",
                    desc: "Manually adjust all criteria weights",
                  },
                ].map(({ value, title, desc }) => (
                  <label
                    key={value}
                    className={`${
                      value == option ? "bg-blue-50" : "bg-transperant"
                    } flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors`}
                  >
                    <input
                      type="radio"
                      name="weightOption"
                      value={value}
                      className={`mt-1 h-4 w-4 text-blue-600`}
                      onChange={(e) => setOption(e.target.value)}
                    />
                    <div>
                      <p className="font-medium text-gray-800">{title}</p>
                      <p className="text-sm text-gray-600">{desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              <div className="text-sm font-medium text-[var(--main-color)] bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                Note: For the last two options, deletion will only complete
                after successful weight adjustment.
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    setDeleteCriteria(false);
                    criteriaIndex.current = null;
                    levelIndex.current = null;
                    stageIndex.current = null;
                  }}
                  className="cursor-pointer px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition font-medium"
                >
                  Cancel
                </button>
                {option && (
                  <button
                    onClick={() =>
                      option == "manual"
                        ? navigate("/dashboard/SeniorExaminer/edit-criteria", {
                            state: {
                              criteria: levelIndex?.current?.stages
                                .filter(
                                  (stage) => stage.id == stageIndex.current
                                )[0]
                                .evaluationCriteria.filter(
                                  (cri) => cri.id != criteriaIndex.current.id
                                ),
                              w: criteriaIndex.current.weight,
                            },
                          })
                        : option == "create"
                        ? navigate(
                            "/dashboard/SeniorExaminer/plan/add-criteria",
                            { state: { criteria: criteriaIndex } }
                          )
                        : navigate("kjj")
                    }
                    className="cursor-pointer px-4 py-2 bg-blue-500  text-white border border-gray-300 rounded-md hover:bg-blue-600 transition font-medium"
                  >
                    {option == "create" && "Create new criteria"}
                    {option == "manual" && "Manual adjustment"}
                    {option == "distribute" && "Distribute automatically"}
                  </button>
                )}
              </div>
            </div>
          </Modal>
        )}
        <div className="p-6 pt-2 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2pb-3">
              Assessment Plan
            </h1>
          </div>
          <div className="mb-6">
            <button
              className="cursor-pointer flex items-center text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-sm"
              onClick={() =>
                navigate("/dashboard/seniorExaminer/plan-setup", {
                  state: { source: "add", length: plan.levels.length + 1 },
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
                title={
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">{`Level ${lvl.order}: ${lvl.name}`}</span>
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          handleEditLevel(lvl);
                        }}
                        className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors mr-2"
                      >
                        <FiEdit2 size={18} className="cursor-pointer" />
                      </button>
                    </div>
                  </div>
                }
                description={lvl.description}
                onDelete={() => {
                  setOpen(true);
                  levelIndex.current = lvl;
                }}
              >
                <div className="mb-4 mt-2">
                  <button
                    className="flex items-center  text-green-500 rounded-md text-sm px-4 py-2 cursor-pointer hover:bg-green-50 transition-colors "
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
                      title={
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium">{`Stage ${stg.order}: ${stg.type}`}</span>
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
                        </div>
                      }
                      description={stg.description}
                      badge={`Passing Score: ${stg.passingScore}%`}
                      onDelete={() => {
                        setOpen(true);
                        levelIndex.current = lvl;
                        stageIndex.current = stg;
                      }}
                    >
                      <div className="bg-blue-50 p-5 rounded-lg mt-2 border border-blue-100">
                        <h4 className="font-medium mb-4 text-gray-800 flex items-center">
                          <span className="w-1 h-5 bg-blue-500 rounded-full mr-2"></span>
                          Evaluation Criteria
                        </h4>
                        <div className="space-y-3">
                          {stg.evaluationCriteria.map((crit, k) => (
                            <div
                              key={crit.id}
                              className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-start border border-gray-100 hover:shadow-md transition-shadow"
                            >
                              <div className="flex-1">
                                <div className="font-medium text-gray-800">
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
                                  <span className="text-xs font-medium text-gray-700 ml-3 min-w-[40px]">
                                    {crit.weight}%
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center ml-2">
                                <button
                                  onClick={() => handleEditCriteria(crit)}
                                  className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors mr-1"
                                >
                                  <FiEdit2
                                    size={16}
                                    className="cursor-pointer"
                                  />
                                </button>
                                <button
                                  onClick={() => {
                                    setDeleteCriteria(true);
                                    levelIndex.current = lvl;
                                    criteriaIndex.current = crit;
                                    stageIndex.current = stg.id;
                                  }}
                                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                                >
                                  <FiTrash2
                                    size={16}
                                    className="cursor-pointer"
                                  />
                                </button>
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
