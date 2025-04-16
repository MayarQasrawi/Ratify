import Modal from "../../shared/modal/Modal";
import ModalButton from "../../Button/ModalButton";
import { FaFileAlt, FaUserTie, FaTasks, FaTimes } from "react-icons/fa";

function ViewExaminerWorkLoad({ setOpen, isOpen, state }) {
  const loads = state?.examinerLoads || [];

  const getIconByType = (type) => {
    switch (type) {
      case "Exam":
        return <FaFileAlt size={24} />;
      case "Interview":
        return <FaUserTie size={24} />;
      case "Task":
        return <FaTasks size={24} />;
      default:
        return <FaFileAlt size={24} />;
    }
  };

  return (
    <>
      {isOpen && (
        <Modal>
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg mx-auto w-full">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {state?.fullName}'s Workload
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Close modal"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              {loads.map(({ id, type, maxWorkLoad, currWorkLoad }) => {
                const percent = Math.min(
                  100,
                  Math.round((currWorkLoad / maxWorkLoad) * 100)
                );
                const remaining = maxWorkLoad - currWorkLoad;
                const badgeColor =
                  remaining > 0
                    ? "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900"
                    : "bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900";

                return (
                  <div
                    key={id}
                    className="relative flex flex-col sm:flex-row items-center sm:items-start bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-sm"
                  >
                    {/* Remaining Badge */}
                    <span
                      className={`absolute top-3 right-3 inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${badgeColor}`}
                    >
                      {remaining > 0 ? `${remaining} slots left` : "Full"}
                    </span>

                    {/* Icon */}
                    <div className="flex-shrink-0 bg-blue-100 text-blue-600 dark:bg-blue-200 dark:text-blue-700 p-3 rounded-full">
                      {getIconByType(type)}
                    </div>

                    {/* Info */}
                    <div className="ml-4 flex-1 w-full">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                        {type}
                      </h3>

                      {/* Progress Bar */}
                      <div className="mt-2">
                        <div className="flex justify-between text-xs font-medium text-gray-600 dark:text-gray-300">
                          <span>
                            {currWorkLoad} / {maxWorkLoad} {type.toLowerCase()}s
                          </span>
                          <span>{percent}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-1 overflow-hidden">
                          <div
                            className="h-full bg-blue-500 transition-all duration-500 animate-pulse"
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {loads.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <FaTasks className="mx-auto mb-2 text-4xl" />
                  <p>No examiner workload data available</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <ModalButton
                variant="confirm"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                Close
              </ModalButton>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ViewExaminerWorkLoad;
