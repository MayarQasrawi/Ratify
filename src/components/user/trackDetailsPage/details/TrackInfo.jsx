import Title from "../shared/Title";
import Stage from "./Stage";

export default function TrackInfo() {
  return (
    <div className="w-[90%] mx-auto mt-9">
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-3">
          <Title>About The Course</Title>
          <p className="text-[#191919] w-[90%] font-medium text-[14px] text-justify">
            This path is designed to help you acquire essential and advanced
            skills in front-end web development, starting from the basics to
            building complete, real-world projects. It is suitable for both
            beginners and professionals looking to enhance their knowledge.
          </p>
          <Title>Stages</Title>
          <Stage />
        </div>
      </div>
    </div>
  );
}
