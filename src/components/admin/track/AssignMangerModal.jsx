import { useEffect, useState } from "react";
import Spinner from "../../shared/Spinner";
import Alert from "../../shared/Alert";
import { useAssignManagerToTrack } from "../../../hooks/Admin/tracks/useAssignManagerToTrack";
import useUpdateManager from "../../../hooks/Admin/tracks/useUpdateManager";
import Header from "../../seniorExaminer/workload/shared/Header";
import useGetExaminersByTrack from "../../../hooks/Admin/tracks/useGetExaminersByTrack";
import useGetSenior from "@/hooks/Admin/tracks/useGetSenior";
const managers = [
  { id: "1", name: "Alice Johnson" },
  { id: "2", name: "Bob Smith" },
  { id: "3", name: "Carol Williams" },
];

export default function AssignMangerModal({ onClose, track, isEdit }) {
  const [selectedManagerId, setSelectedManagerId] = useState("");
  const { data: trackTeam, isLoading } = useGetExaminersByTrack(track.id);
  console.log(
    trackTeam?.data,
    "inside assign manger model //////////////////////////////////",
    isEdit,
    track.id
  );
  const {
    mutate: assignManger,
    isPending,
    isSuccess,
    isError,
  } = useAssignManagerToTrack();

  const {
    mutate: updateMangar,
    isPending: updatePending,
    isSuccess: updateIsSuccess,
    isError: updateIsError,
    data
  } = useUpdateManager();
  
  const handleAssign = () => {
    if (isEdit) {
      updateMangar({ trackId: track?.id, examinerId: selectedManagerId });
    } else {
      assignManger(
        {
          trackId: track?.id,
          examinerId: selectedManagerId,
        },
        {
          onSuccess: () => {
            setTimeout(() => onClose(), 2000);
          },
        }
      );
    }
  };
useEffect(()=>{
if(updateIsSuccess || isSuccess)
  setTimeout(()=>onClose(),1400)
},[updateIsSuccess,isSuccess])


  console.log("track inside assign manger /////", track,data);
  // let isLoading=false
  return (
    <>
      {isSuccess && <Alert message="Manager assigned successfully!" />}
       {updateIsSuccess && <Alert message={data.message}/>}
      {(isError || updateIsError) && (
        <Alert
          type="error"
          message={
            isError
              ? "An error occurred while assigning the manager."
              : "An error occurred while updating the manager"
          }
        />
      )}
      <div className="bg-white min-w-[550px] rounded-lg shadow-lg pb-6 overflow-hidden">
        <Header>
          {isEdit ? "Edit" : "Assign"} {track.name} Manager
        </Header>
        {isLoading ? (
          <div className=" flex items-center justify-center py-4 h-28">
            <Spinner className="mr-2" color='blue-500' />
          </div>
        ) : !isLoading && trackTeam.data.length == 0 ? (
          <>
          <div className="text-center m-4  text-gray-600 dark:text-gray-300 py-10 px-6 bg-white dark:bg-gray-800 rounded-2xl  dark:border-gray-600 shadow-lg transition-all">
            <div className="flex flex-col items-center space-y-3">
              <svg
                className="w-10 h-10 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14v.01M12 10a4 4 0 00-4 4v1h8v-1a4 4 0 00-4-4zM12 6.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
                />
              </svg>
              <p className="text-lg font-medium">No Examiner Found</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                There are currently no examiners assigned to this track. Please
                check back later or assign one manually.
              </p>
            </div>
            
          </div>
          <div className="flex justify-end pr-3">
              <button
                onClick={onClose}
                className="bg-gray-200 hover:bg-gray-300 cursor-pointer text-gray-800 px-4 py-2 rounded-md transition-colors"
                disabled={isPending}
              >
                Cancel
              </button>
            </div>
            </>
        ) : (
          <div className="px-6 mt-4">
            <label className="block font-medium text-gray-700 mb-2">
              Pick a Manager <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 mt-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={selectedManagerId}
              onChange={(e) => setSelectedManagerId(e.target.value)}
            >
              <option value="" hidden>
                Select a manager
              </option>
              {trackTeam?.data?.map((manager) => (
                <option key={manager.id} value={manager.id}>
                  {manager.fullName}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-3 mt-4">
              {(!isPending || !updatePending) && (
                <button
                  onClick={onClose}
                  className="bg-gray-200 hover:bg-gray-300 cursor-pointer text-gray-800 px-4 py-2 rounded-md transition-colors"
                  disabled={isPending}
                >
                  Cancel
                </button>
              )}
              <button
                onClick={handleAssign}
                disabled={!selectedManagerId || isPending || updatePending}
                className={`px-4 py-2 rounded-md text-white flex items-center gap-2 min-w-[100px] justify-center ${
                  selectedManagerId && !isPending
                    ? "bg-blue-600 cursor-pointer hover:bg-blue-700"
                    : "bg-blue-300 cursor-not-allowed"
                }`}
              >
                {isPending || updatePending ? (
                  <>
                    <Spinner />
                    <span>{isEdit && "Edit"}Assign</span>
                  </>
                ) : (
                  <span>{isEdit ? "Edit Manager" : "Assign"}</span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
