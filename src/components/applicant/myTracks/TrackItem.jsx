import ProgressBar from "./ProgressBar";
import { RiArrowRightLine } from "react-icons/ri";
import { Link } from "react-router-dom";
export default function TrackItem({ name, img,trackId,status,enrollmentId }) {
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
    <div className="h-96 bg-white shadow-sm border border-[var(--table-border)] p-4 lg:px-8  rounded-2xl   md:w-full flex flex-col  justify-between">
      <div className="flex mt-2.5 lg:flex-wrap gap-3 ">
        <div className="bg-[var(--secondary-color)] justify-center xl:justify-around w-full  h-64  px-4 py-6 rounded-4xl flex gap-3.5 items-center">
          <img src={img} className="w-[120px]" alt={name} />
          <h2 className="text-2xl  text-[var(--main-color)] font-bold text-center">
            {formattedName}
          </h2>
        </div>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-3 items-center justify-between">
        <ProgressBar />
        <Link 
        state={{ name: name, status: status }}
         to={`/applicant/my-tracks/${name}/${enrollmentId}`}
        className="bg-[var(--main-color)] flex  hover:bg-[#2A5C8A] transition items-center gap-2 px-6 rounded-md text-[18px]  font-bold  py-1 text-white cursor-pointer">
         
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
