import React from "react";
import LevelProgress from "./LevelProgress";
import IconActionButton from "../../../Button/IconActionButton";
import { MdOutlineRocketLaunch } from "react-icons/md";
import Lottie from "lottie-react";
import Level from "../../../../assets/img/animation/LevelSidebar.json"; // Adjust the path as necessary
import classNames from "classnames";
import { MdOutlineTimeline } from "react-icons/md";
const LevelSidebar = ({ selectedLevel, levels, setSelectedLevel }) => {
  const boxClass = classNames("bg-white rounded-lg p-4 shadow-sm border", {
    "border-[var(--table-border)]": true,
  });

  return (
    <>
      <aside className=" flex flex-col gap-6  sticky top-28 h-fit overflow-y-auto ">
        <div
          className={`   ${boxClass}`}
        >
          
          
          <div className="flex flex-col gap-2 pb-4">
            <div className="bg-[var(--main-color)] rounded-lg p-4 mb-4 ">
            
              <h2 className="font-bold text-lg text-white flex items-center gap-2">
                <MdOutlineTimeline className="text-white/80" />
                Your Journey
              </h2>
            </div>


           

           <div className="mt-6  mx-4">
                    <LevelProgress
                      stagesCount={selectedLevel.stagesCount}
                      stagesProgressesCount={
                        selectedLevel.stagesProgressesCount
                      }
                    />
                  </div>

            {levels.map((level) => (
              <IconActionButton
                key={level.id}
                onClick={() => setSelectedLevel(level)}
                className={` mx-4 `}
                label={level.levelName}
                color={
                  selectedLevel?.id === level.id ? "purple" : "blue"
                }
              />
            ))}
          </div>
          
  

           <Lottie
            animationData={Level}
            loop={true}
            autoplay={true}
            className="w-40 h-40 mx-auto mt-4"
          />
          
        </div>

        {/* <div className={`flex flex-col gap-2 pb-4 items-center ${boxClass}`}>
          <Lottie
            animationData={Level}
            loop={true}
            autoplay={true}
            className="w-40 h-40 mx-auto mt-4"
          />
          <IconActionButton
            onClick={() => setSelectedLevel(null)}
            className="mt-1 w-32 "
            label="Continue"
            color="blue"
            Icon={MdOutlineRocketLaunch}
            ariaLabel="Continue to the next stage"
          />
        </div> */}
      </aside>
    </>
  );
};

export default LevelSidebar;
