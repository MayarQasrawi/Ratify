import ProgressBar from "./ProgressBar";
import { RiArrowRightLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function TrackItem({
  name,
  img,
  trackId,
  status,
  enrollmentId,
}) {
  const formattedName =
    name.toLowerCase().includes("front end") ||
    name.toLowerCase().includes("back end") ? (
      <>
        {name}
        <span className="text-white">Development</span>
      </>
    ) : (
      name
    );

  return (
    <div className="m-h-100 shadow-sm border border-[var(--table-border)] p-4 lg:px-8 rounded-2xl md:w-full flex flex-col justify-between bg-white">
      <div className="flex mt-2.5 lg:flex-wrap gap-3">
        <div className="bg-[var(--secondary-color)] justify-center xl:justify-around w-full h-64 px-4 py-6 rounded-4xl flex gap-3.5 items-center">
          <div className="flex-shrink-0">
            <img
              src={`${import.meta.env.VITE_API}${img}`}
              className="w-[180px] h-[120px] lg:w-[280px] lg:h-[220px] object-cover rounded-4xl shadow-md"
              alt={name}
            />
          </div>
          <h2 className="text-2xl text-[var(--main-color)] font-bold text-center flex-1">
            {formattedName.toUpperCase()}
          </h2>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-3 items-center justify-between mb-3">
        <ProgressBar enrollmentId={enrollmentId} trackId={trackId} />
        <Link
          to={`/applicant/my-tracks/${name}/${enrollmentId}`}
          className="bg-[var(--main-color)] flex hover:bg-[#2A5C8A] transition items-center gap-2 px-6 rounded-md text-[18px] font-bold py-1 text-white cursor-pointer"
          state={{ name: name, status: status, trackId: trackId }}
        >
          {status.toLowerCase() !== "completed" ? (
            <>
              Continue <RiArrowRightLine className="font-bold text-2xl" />
            </>
          ) : (
            "View"
          )}
        </Link>
      </div>
    </div>
  );
}
