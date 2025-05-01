import React from 'react';

const LevelProgress = ({ level }) => {
  const totalStages = level.stages.length;
  const completedStages = level.stages.filter(stage => stage.status === 'completed').length;
  const progressPercentage = totalStages > 0 ? (completedStages / totalStages) * 100 : 0;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-gray-500 mb-1">
        <span>Progress</span>
        <span>{completedStages}/{totalStages} completed</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-green-500 h-2 rounded-full transition-all duration-500" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LevelProgress;
