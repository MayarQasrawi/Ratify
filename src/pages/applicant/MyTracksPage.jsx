import RegisterTrack from "../../components/applicant/myTracks/RegisterTrack";
import DashboardHeader from "../../components/applicant/dashboard/DashboardHeader";
export default function MyTracksPage() {
  return (
    <main className="mt-10 w-[90%] mx-auto">

      <DashboardHeader/>

    <div className="flex items-center"> 
      <h1 className="text-[var(--main-color)] text-[28px] font-bold font-mono text-center w-full xl:w-fit xl:text-left ">MY TRACKS</h1>
      <div className="flex-1 border-t-2 hidden xl:block rounded-full border-[var(--main-color)] ml-2"></div>
      </div>   
      <RegisterTrack />
    </main>
  )
}
