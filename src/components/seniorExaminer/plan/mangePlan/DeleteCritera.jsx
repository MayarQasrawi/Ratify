import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiAlertTriangle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Alert from "../../../shared/Alert";
import useHandleDeleteCriteria from "../../../../hooks/seniorExaminer/plan/useHandleDeleteCriteria";
import Spinner from "../../../shared/Spinner";

export default function DeleteCritera({ onClose, criteriaIndex,handleAddCriteria,stageIndex,levelIndex }) {
  const [option, setOption] = useState(false);
  const navigate = useNavigate();
  console.log(criteriaIndex.current.id,'criteriaIndex yt kkkkkkkkkkkkkkkkkkkk',criteriaIndex,stageIndex.current)
 const {
    data:deleteCriteriaData ,
    error: updateError,
    isError:isDeleteCriteriaError,
    mutate:deleteCriteria,
    isPending:isDeleteCriteriaPending,
    isSuccess:isDeleteCriteriaSuccess,
  } = useHandleDeleteCriteria();
  console.log(deleteCriteriaData,'deleteCriteriaData')
  useEffect(()=>{
  if(isDeleteCriteriaSuccess)
   setTimeout(()=>window.location.reload(),1500) 
  },[isDeleteCriteriaSuccess])
  return (
    <>
      {isDeleteCriteriaError  && (
        <Alert type="error" message="Request Fail" />
      )}
      {isDeleteCriteriaSuccess  && (
        <Alert message='success' />
      )}
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
          onClick={onClose}
          className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
        >
          <AiOutlineClose size={20} />
        </button>
      </div>
      <p className="text-sm">
        Are you sure you wont to delete{" "}
        <span className="text-blue-500 text-md font-bold capitalize">
          {criteriaIndex.current.name}
        </span>{" "}
        Criteria ?
      </p>
      <div className="space-y-4 max-h-45 overflow-y-auto pr-2 scrollbar-custom ">
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
      <div className="flex justify-end gap-3 pt-2">
   {!isDeleteCriteriaPending &&<button
          onClick={onClose}
          className="cursor-pointer px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition font-medium"
        >
          Cancel
        </button>}     
        {option && (
          <button
           disabled={isDeleteCriteriaPending}
            onClick={() =>
              option == "manual"
                ? navigate("/dashboard/SeniorExaminer/edit-criteria", {
                    state: {
                      criteria: levelIndex?.current?.stages
                        .filter((stage) => stage.id == stageIndex.current)[0]
                        .evaluationCriteria.filter(
                          (cri) => cri.id != criteriaIndex.current.id
                        ),
                      w: criteriaIndex.current.weight,
                      id:criteriaIndex.current.id,
                      stageId:stageIndex.current
                    },
                  })
                : option == "create"
                ? handleAddCriteria()
                : deleteCriteria({id:stageIndex.current,info:{criteriaIdToDelete:criteriaIndex.current.id,deletionMode:'DistributeWeight',stageId:stageIndex.current}})
            }
            className="cursor-pointer px-4 py-2 bg-blue-500 flex items-center gap-1 disabled:cursor-not-allowed  text-white border border-gray-300 rounded-md hover:bg-blue-600 transition font-medium"
          >
            {isDeleteCriteriaPending && <Spinner />}
            {option == "create" && "Create new criteria"}
            {option == "manual" && "Manual adjustment"}
            {option == "distribute" && "Distribute automatically"}
          </button>
        )}
      </div>
    </div>
    </>
  );
}
