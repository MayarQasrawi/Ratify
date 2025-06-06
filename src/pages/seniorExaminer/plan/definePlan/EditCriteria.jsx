import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiSave, FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import Back from "../../../../components/shared/dashboard/Back";
import useHandleDeleteCriteria from "../../../../hooks/seniorExaminer/plan/useHandleDeleteCriteria";
import Alert from "../../../../components/shared/Alert";
import Spinner from "../../../../components/shared/Spinner";

function EditCriteria() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(
    location.state?.criteria,
    "inside edit criteria adjust ",
    location.state?.id
  );
  const initialCriteria = location.state?.criteria.filter(cr =>cr.isActive==true)|| [];
  const { isPending, mutate, isError, isSuccess, data } =
    useHandleDeleteCriteria();
  const [tempWeights, setTempWeights] = useState(
    initialCriteria.map((c) => Number(c.weight))
  );
  const totalWeight = tempWeights.reduce((sum, w) => sum + w, 0);
  const getErrorMessage = () => {
    if (totalWeight > 100)
      return "Total weight exceeds 100. Please adjust your values.";
    if (totalWeight < 100) return `Total weight must equal 100`;
    return "";
  };
  const errorMessage = getErrorMessage();
  const handleWeightChange = (index, value) => {
    const newValue =
      value === "" ? 0 : Math.max(0, Math.min(100, Number(value)));
    setTempWeights(tempWeights.map((w, i) => (i === index ? newValue : w)));
  };
  console.log(data, "data response");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (totalWeight !== 100) return;
    const updatedCriteria = initialCriteria.map((c, i) => ({
      ...c,
      weight: tempWeights[i],
    }));
    console.log("Submitting updated criteria:", updatedCriteria);
    mutate({
      id: location.state?.stageId,
      info: {
        updatedCriteria: updatedCriteria,
        criteriaIdToDelete: location.state?.id,
        stageId: location.state?.stageId,
        deletionMode: "UpdateAllManually",
      },
    });
  };
    useEffect(() => {
      if (isSuccess)
        setTimeout(() => {
          navigate("/dashboard/seniorExaminer/plan");
          window.location.reload();
        }, 1600);
    }, [isSuccess]);
  console.log(location.state);
  return (
    <>
      {isError && (
        <Alert message="Request Failed  Please try again" type="error" />
      )}
      {isSuccess && <Alert message={data.data} />}
      <div className="min-h-screen px-4   ">
        <Back
          text="Back To Plan"
          onClick={() => {
            navigate("/dashboard/seniorExaminer/plan");
          }}
        />
        <div className="max-w-3xl mx-auto mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="bg-blue-500 dark:bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              {totalWeight === 100 ? (
                <>
                  <FiCheckCircle className="text-green-400 text-lg" />
                  <span className="text-sm text-white font-medium">
                    Total: 100/100
                  </span>
                </>
              ) : (
                <>
                  <FiAlertTriangle className="text-yellow-400 text-lg" />
                  <span className="text-sm text-white font-medium">
                    Total : {totalWeight} / 100
                  </span>
                </>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {errorMessage && (
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 text-yellow-700 dark:text-yellow-300 rounded-md">
                <div className="flex items-center gap-2">
                  <FiAlertTriangle />
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
              <table className="min-w-full text-sm divide-y divide-gray-200 dark:divide-gray-700">
                <tbody>
                  {initialCriteria.map((cri, index) => (
                    <tr
                      key={index}
                      className={`
                  ${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-700"
                  }
                  hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors
                `}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap capitalize">
                        {cri.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            type="number"
                            value={tempWeights[index]}
                            onChange={(e) =>
                              handleWeightChange(index, e.target.value)
                            }
                            min="0"
                            max="100"
                            className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                          />
                          <span className="ml-2 text-gray-600 dark:text-gray-400">
                            %
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}

                  <tr
                    className={`
                font-semibold
                ${
                  totalWeight === 100
                    ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-300"
                    : "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300"
                }
              `}
                  >
                    <td
                      className="px-6 py-3 text-center dark:text-white"
                      colSpan={2}
                    >
                      Total Weight: {totalWeight}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={totalWeight !== 100 ||isPending  }
                className={`
            flex items-center gap-1 px-6 py-3 rounded-lg font-medium text-white transition
            ${
              totalWeight === 100
                ? "bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }
          `}
              >
                {!isPending ? (
                  <>
                    <FiSave className="mr-2" />
                    <span> Save Changes</span>
                  </>
                ) : (
                  <>
                    <Spinner />
                    <span> Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditCriteria;
