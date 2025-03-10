import RegisterTrack from "../../components/applicant/myTracks/RegisterTrack";

export default function MyTracksPage() {
  return (
    <main className="mt-10 w-[90%] mx-auto">
    <div className="flex items-center"> 
      <h1 className="text-[#3B82F6] text-[28px] font-bold text-center w-full xl:w-fit xl:text-left ">MY TRACKS</h1>
      <div className="flex-1 border-t-2 hidden xl:block rounded-full border-[#3B82F6] ml-2"></div>
      </div>   
      <RegisterTrack />
    </main>
  )
}
