import React from 'react';
import StageIcon from './StageIcon';
import StatusBadge from './StatusBadge';

const StageCard = ({ stage, onClick }) => {
  const isLocked = stage.status === 'locked';
  const handleClick = () => {
    if (!isLocked) onClick(stage);
  };

  const progressPercent = stage.score !== undefined
    ? (stage.score / stage.maxScore) * 100
    : 0;

  return (
    <div 
      className={`border border-[var(--table-border)]  shadow-sm  bg-white rounded-lg p-4 mb-4 flex items-start cursor-pointer hover:shadow-md transition-shadow ${
        isLocked ? 'opacity-60' : ''
      }`}
      onClick={handleClick}
    >
      <StageIcon type={stage.type} />

      <div className="ml-4 flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{stage.title}</h3>
          <StatusBadge status={stage.status} />
        </div>

        {stage.score !== undefined && (
          <div className="mt-2">
            <div className="text-sm text-gray-500">
              Score: {stage.score}/{stage.maxScore}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        )}

        {stage.dueDate && (
          <p className="text-sm text-gray-500 mt-2">
            Due: {new Date(stage.dueDate).toLocaleDateString()}
          </p>
        )}

        {stage.scheduledDate && (
          <p className="text-sm text-gray-500 mt-2">
            Scheduled: {new Date(stage.scheduledDate).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default StageCard;
