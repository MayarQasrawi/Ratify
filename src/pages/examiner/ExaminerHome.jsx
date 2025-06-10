import Event from "@/components/examiner/home/Event";
import ExaminerStatsCard from "@/components/examiner/home/ExaminerStatsCard";

export default function ExaminerHome() {
  return (
    <div className="flex gap-4 p-3 flex-col lg:flex-row">
      <div className="w-full  lg:w-[65%] ">
         <ExaminerStatsCard />
      </div>
   <div>
    <Event />
   </div>
    </div>
  )
}
