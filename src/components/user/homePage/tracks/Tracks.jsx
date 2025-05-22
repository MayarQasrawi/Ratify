import { useNavigate } from "react-router-dom";
import Button from "../../shared/Button";
import Title from '../../shared/Title'
import TrackCard from "./TrackCard";
import useGetAllTraks from "../../../../hooks/admin/tracks/useGetAllTracks";
import myImg from "../../../../assets/img/Frame.svg";
import useGetActiveTraks from "../../../../hooks/user/useGetActiveTrack";
const tracks = [
  { id: 1, name: "Front-End", image: myImg },
  { id: 2, name: "Back-End", image: myImg },
  { id: 3, name: "Front-End", image: myImg },
  { id: 3, name: "Front-End", image: myImg },
];
export default function Tracks() {
  const {data:track,isLoading:isTrackLoading,isError}= useGetActiveTraks()
  console.log(track?.data,'active hhhhhhhhhhhhhhhhhhhhhhhhkkkkkkkkkkkkkkkkkk',isTrackLoading)
  const navigate=useNavigate();
  let isLoading=false;
  return (
    <section className="w-[90%] mx-auto  flex flex-col md:flex-row gap-14 lg:gap-8 mt-32 relative items-center">
      <div className=" relative md:w-[40%]  flex flex-col gap-4 lg:gap-3 items-start">
        <div className="mb-2">
          <Title first="Our Most " last="Popular Tracks" />
        </div>
        <p className="text-[#263238] text-[14px] lg:text-[18px] w-[80%] hidden md:block">
          Find the path that matches your ambition and start your journey to
          excellence.
        </p>
        <Button  onClick={()=>{navigate('/our-tracks')}}>Explore all Tracks</Button>
      </div>
      <div className="flex-1 ">
        <TrackCard isLoading={isTrackLoading} tracks={track?.data} isError={isError}/>
      </div>
    </section>
  );
}
