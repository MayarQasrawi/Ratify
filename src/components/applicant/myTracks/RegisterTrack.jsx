import img from "../../../assets/img/tracks/frontEnd.png";
import ProgressBar from "./ProgressBar";
import TrackItem from "./TrackItem";
const myTracks = [
  { id: 1, name: "Front End ", img },
  { id: 2, name: "Basics ", img },
];
export default function RegisterTrack() {
  return (
    <div className="mt-8 flex flex-col items-center xl:items-start gap-y-8  ">
      {myTracks.map((myTrack, ind) => (
        <TrackItem key={ind} name={myTrack.name} img={myTrack.img} />
      ))}
    </div>
  );
}
