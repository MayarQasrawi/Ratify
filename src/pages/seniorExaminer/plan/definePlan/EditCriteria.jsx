import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FiSave,
  FiAlertTriangle,
  FiCheckCircle,
  FiArrowLeft,
} from "react-icons/fi";

function EditCriteria() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state?.criteria, "inside edit ");
  const initialCriteria = location.state?.criteria || [];
  const [tempWeights, setTempWeights] = useState(
    initialCriteria.map((c) => Number(c.Weight))
  );
  const totalWeight = tempWeights.reduce((sum, w) => sum + w, 0);
  const getErrorMessage = () => {
    if (totalWeight > 100)
      return "Total weight exceeds 100. Please adjust your values.";
    if (totalWeight < 100)
      return `Total weight must equal 100`;
    return "";
  };
  const errorMessage = getErrorMessage();
  const handleWeightChange = (index, value) => {
    const newValue =
      value === "" ? 0 : Math.max(0, Math.min(100, Number(value)));
    setTempWeights(tempWeights.map((w, i) => (i === index ? newValue : w)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (totalWeight !== 100) return;

    const updatedCriteria = initialCriteria.map((c, i) => ({
      ...c,
      Weight: tempWeights[i],
    }));

    console.log("Submitting updated criteria:", updatedCriteria);
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-[var(--main-color)] text-white px-6 py-4 flex justify-between items-center">
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
            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded-md">
              <div className="flex items-center gap-2">
                <FiAlertTriangle />
                <span>{errorMessage}</span>
              </div>
            </div>
          )}
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="min-w-full text-sm divide-y divide-gray-200">
              <tbody>
                {initialCriteria.map((cri, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition-colors`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
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
                          className="w-24 px-3 py-2 border border-gray-300 rounded-md outline-none"
                          min="0"
                          max="100"
                        />
                        <span className="ml-2 text-gray-600">%</span>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr
                  className={`font-semibold  ${
                    totalWeight === 100
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  <td className="px-6 py-3 text-center" colSpan={2}>
                    Total Weight: {totalWeight}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={totalWeight !== 100}
              className={`flex items-center px-6 py-3 rounded-lg font-medium text-white transition ${
                totalWeight === 100
                  ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              <FiSave className="mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCriteria;
