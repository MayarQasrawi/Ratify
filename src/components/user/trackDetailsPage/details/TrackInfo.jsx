import Title from "../shared/Title";
import Accordion from "./Accordion";
import Stage from "./Stage";

export default function TrackInfo({skill , description,stageType}) {
  return (
    <div className="w-[90%] mx-auto mt-11">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="flex flex-col gap-3">
          <Title>About The Course</Title>
          <p className="text-[#191919] lg:w-[90%] font-medium text-[14px] text-center lg:text-justify">
           {description}
          </p>
          <Title>Stages</Title>
          <Stage stageType={stageType} />
        </div>
        <div>
        <Title>Target Skill</Title>
        <div className="mt-6 rounded-2xl border border-gray-200 px-4">
          {skill.map((skill,ind)=><Accordion key={ind} skill={skill} ind={ind} />)}
        </div>
        </div>
      </div>
    </div>
  );
}
