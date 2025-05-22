import Title from "../../shared/Title";
import { FaUserTie, FaBookOpen, FaRocket } from "react-icons/fa";
import img from "../../../../assets/img/animation/achivment.json";
import Lottie from "lottie-react";
import useGetExaminers from "../../../../hooks/Admin/useGetExaminers";
import useGetActiveTraks from "../../../../hooks/user/useGetActiveTrack";

export default function Achievements() {
  const {data:tracks,isLoading:isTrackLoading,isError}= useGetActiveTraks()
  const {data:Team, isLoading:isTeamLoading, isError:isTeamError,error}=useGetExaminers({currentPage:1,itemsPerPage:4})
 console.log(tracks,Team ,'inside ach nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn')
  return (
    <section className="p-10 text-center mt-32 bg-gray-100">
      <Title first="Our " last="Achievements" />
      <div className="flex  mt-8 flex-raw  justify-center gap-3  items-center">
        <div className=" w-[60%] mt-8 flex justify-center gap-8  flex-wrap">
          <div className="bg-white  cursor-pointer hover:translate-y-[-10px] transition duration-300 rounded-2xl  p-6 w-[200px] shadow-md flex flex-col items-center gap-2  ">
            <span className="text-[var(--main-color)] font-bold sm:text-5xl text-left  text-4xl">
              {Team?.data.totalCount || 50}
            </span>
            <div className="flex gap-2 items-center text-[#303030]">
              {" "}
              <FaUserTie size={30} />{" "}
              <span className="text-[16px] font-medium">Experts</span>{" "}
            </div>
          </div>
          <div className="bg-white cursor-pointer hover:translate-y-[-10px] transition duration-300 rounded-2xl  p-6 w-[200px] shadow-md flex flex-col items-center gap-2 ">
            <span className="text-[var(--main-color)] font-bold  text-4xl sm:text-5xl">
              {tracks?.data.length || 100}
            </span>
            <div className="flex gap-2 items-center text-left text-[#303030]">
              <FaBookOpen size={30} />{" "}
              <span className="text-[16px] font-medium">
                Track <br />
                Available
              </span>{" "}
            </div>
          </div>
          <div className=" bg-[var(--main-color)] rounded-2xl  hover:bg-[#003F7D] transition p-6 text-center shadow text-white text-[20px] sm:text-2xl font-bold md:w-[380px] lg:w-[430px]">
            <span> Start your journey </span>
            <span>now</span>
            <FaRocket className="mt-1.5 text-white inline  ml-2" />
          </div>
        </div>
        <div className="hidden lg:block mr-20">
          <Lottie
            animationData={img}
            loop={true}
            autoplay={true}
            style={{ width: "650px", height: "auto" }}
          />
        </div>
      </div>
    </section>
  );
}
