import { useNavigate } from "react-router-dom";
import Button from "../../shared/Button";
import Title from '../../shared/Title'
import TrackCard from "./TrackCard";

export default function Tracks() {
  const navigate=useNavigate();

  return (
    <section className="w-[90%] mx-auto  flex flex-col md:flex-row gap-12 mt-24 relative items-center">
      <div className=" relative md:w-[40%]  flex flex-col gap-4 lg:gap-3 items-start">
        <div className="mb-2">
          <Title first="Our Most " last="Popular Tracks" />
        </div>
        <p className="text-[#263238] text-[14px] lg:text-[18px] w-[80%] hidden sm:block">
          Find the path that matches your ambition and start your journey to
          excellence.
        </p>
        <Button  onClick={()=>{navigate('/our-tracks')}}>Explore all Tracks</Button>
      </div>
      <div className="flex-1 ">
        <TrackCard />
      </div>
    </section>
  );
}
