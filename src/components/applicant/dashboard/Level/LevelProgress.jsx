import React from 'react';
import { MdOutlinePercent } from 'react-icons/md';
import { motion } from 'framer-motion';
const LevelProgress = ({ stagesCount, stagesProgressesCount }) => {
  const totalStages = stagesCount;
  const completedStages = stagesProgressesCount;
  const progressPercentage = totalStages > 0 ? Math.round((completedStages / totalStages) * 100) : 0;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MdOutlinePercent className="text-[var(--main-color)] text-xl" />
          <span className="text-[var(--main-color)] font-medium">Your Progress</span>
        </div>
        <span className="text-[var(--main-color)] font-bold">{progressPercentage}%</span>
      </div>
              <div className="h-3 bg-gray-100 rounded-full mt-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                ></motion.div>
              </div>
            </div>
  );
};

export default LevelProgress;
