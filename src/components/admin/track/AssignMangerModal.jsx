import { useState } from 'react';
import Spinner from '../../shared/Spinner';
import Alert from '../../shared/Alert';
import { useAssignManagerToTrack } from '../../../hooks/Admin/tracks/useAssignManagerToTrack';
import useUpdateManager from '../../../hooks/Admin/tracks/useUpdateManager';
import Header from '../../seniorExaminer/workload/shared/Header';

const managers = [
  { id: '1', name: 'Alice Johnson' },
  { id: '2', name: 'Bob Smith' },
  { id: '3', name: 'Carol Williams' },
];

export default function AssignMangerModal({ onClose, track,isEdit}) {
  const [selectedManagerId, setSelectedManagerId] = useState('');
  const { 
    mutate: assignManger,
    isPending,
    isSuccess,
    isError 
  } =  useAssignManagerToTrack();
const { 
    mutate: updateMangar,
    isPending:updatePending,
    isSuccess:updateIsSuccess,
    isError:updateIsError 
  } =useUpdateManager()
  const handleAssign = () => {
    if(isEdit){
  updateMangar({trackId: track?.id,
      examinerId: selectedManagerId})
    }else{
     assignManger({
      trackId: track?.id,
      examinerId: selectedManagerId
    }, {
      onSuccess: () => {
        onClose();
      }
    });
    }
  };
  console.log('track inside assign manger',track)
let isLoading=false
  return (
      <>
     {isSuccess && <Alert message="Manager assigned successfully!" />}
     {(isError ||updateIsError ) && <Alert type="error" message={isError?"An error occurred while assigning the manager.":'An error occurred while updating the manager'} />}
    <div className="bg-white min-w-[550px] rounded-lg shadow-lg pb-6 overflow-hidden">
      <Header>{isEdit?"Edit":"Assign"} {track.name}  Manager</Header>
      {isLoading ? (
        <p className="text-gray-500 flex items-center justify-center py-4"><Spinner className="mr-2" />Processing...</p>
      ) : (
        <div className='px-6 mt-4'>
          <label className="block font-medium text-gray-700 mb-2">Pick a Manager <span className='text-red-500'>*</span></label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 mt-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            value={selectedManagerId}
            onChange={(e) => setSelectedManagerId(e.target.value)}
          >
            <option value="" hidden>Select a manager</option>
            {managers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.name}
              </option>
            ))}
          </select>
          <div className="flex justify-end space-x-3 mt-4">
            {(!isPending ||!updatePending) &&<button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 cursor-pointer text-gray-800 px-4 py-2 rounded-md transition-colors"
              disabled={isPending}
            >
              Cancel
            </button>}
            <button
              onClick={handleAssign}
              disabled={!selectedManagerId || (isPending || updatePending)}
              className={`px-4 py-2 rounded-md text-white flex items-center gap-2 min-w-[100px] justify-center ${
                selectedManagerId && !isPending
                  ? 'bg-blue-600 cursor-pointer hover:bg-blue-700'
                  : 'bg-blue-300 cursor-not-allowed'
              }`}
            >
              {(isPending ||updatePending) ?<><Spinner /><span>{isEdit&&'Edit'}Assign</span></>  :<span>{isEdit?'Edit Manager':'Assign'}</span> }
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
