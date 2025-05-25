import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import ExamModal from "./ExamModal";

export default function ApproveAllModal({ cancelAction, selectedRequest,currentWeek,allRequest }) {
  const [approveScope, setApproveScope] = useState('');
  if(approveScope)
   return <ExamModal cancelAction={cancelAction} selectedRequest={approveScope=='current'?currentWeek():allRequest ()} all={true}/>

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-y-auto">
      <header className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Approve Requests
        </h3>
        <button
          onClick={cancelAction}
          className="text-gray-500 cursor-pointer dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          <MdClose className="w-6 h-6" />
        </button>
      </header>

      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Select which requests to approve:
      </p>
      <form>
        <div className="space-y-4 mb-6">
          <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <input
              type="radio"
              name="approveScope"
              value="current"
              checked={approveScope === "current"}
              onChange={() => setApproveScope("current")}
              className="form-radio text-blue-600 h-5 w-5"
            />
            <div className="ml-3">
              <p className="font-medium text-gray-900 dark:text-gray-100">
                Current Week
              </p>
            </div>
          </label>

          <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <input
              type="radio"
              name="approveScope"
              value="all"
              checked={approveScope === "all"}
              onChange={() => setApproveScope("all")}
              className="form-radio text-green-600 h-5 w-5"
            />
            <div className="ml-3">
              <p className="font-medium text-gray-900 dark:text-gray-100">
                All Weeks
              </p>
            </div>
          </label>
        </div>
        {approveScope && <div className="flex justify-end">
         <button
            type="button"
            className=" bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <FaCheckCircle />
            {approveScope === "all" ? "Approve All Weeks" : "Approve Current Week"}
          </button>
      </div>}
     
         
      </form>
    </div>
  );
}

