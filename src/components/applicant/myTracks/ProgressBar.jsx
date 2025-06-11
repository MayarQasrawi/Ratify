import useFetchTrackById from "@/hooks/Admin/tracks/useFetchTrackById";
import useGetTrackProgressCurrent from "@/hooks/applicant/progress/useGetTrackCurrent";
import { useState, useEffect } from "react";

export default function ProgressBar({ enrollmentId, trackId }) {
  const { data: trackProgress } = useGetTrackProgressCurrent(enrollmentId);
  const { data: trackStage } = useFetchTrackById(trackId);

  const allStages =
    trackStage?.data?.levels?.flatMap((lvl) => lvl.stages || []) || [];
  const total = allStages.length;

  const doneCount = trackProgress?.data
    ? allStages.findIndex((s) => s.id === trackProgress.data.stageId) + 1
    : 0;

  const percentDone = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  const [progress, setProgress] = useState(percentDone);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setProgress(percentDone);
  }, [percentDone]);

  return (
    <div className="relative w-full lg:w-[65%] h-2 bg-[#E7ECFF] rounded-full cursor-pointer inline-block">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="h-2 rounded-full transition-all duration-300 bg-[#3B82F6]"
        style={{ width: `${progress}%` }}
      />
      <span className="ml-3 inline-block mt-2 px-2 py-0.5 text-xs font-medium text-[#3B82F6] bg-[#E7ECFF] rounded-md shadow-sm">
        {doneCount} / {total} Stages
      </span>
      {showTooltip && (
        <div
          className="absolute -top-10 px-2 py-1 text-sm font-bold text-white bg-[#3B82F6] rounded-md shadow-md"
          style={{
            left: `calc(${progress}% - 20px)`,
            transform: "translateX(-50%)",
          }}
        >
          {progress}%
          <div
            className="absolute left-1/2 -bottom-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
            style={{
              borderTopColor: "#3B82F6",
              transform: "translateX(-50%)",
            }}
          />
        </div>
      )}
    </div>
  );
}
