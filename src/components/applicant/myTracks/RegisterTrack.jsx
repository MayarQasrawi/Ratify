import { Navigate } from "react-router-dom";
import img from "../../../assets/img/tracks/frontEnd.png";
import { useAuthContext } from "../../../contexts/AuthProvider";
import useGetApplicantTrack from "../../../hooks/applicant/enroll/useGetApplicantTrack";
import Extract from "../../../utils/Extract";
import ProgressBar from "./ProgressBar";
import TrackItem from "./TrackItem";
const myTracks = [
  { trackId: 1, trackName: "Front End ", img ,status:'Active'},
  { trackId: 2, trackName: "Basics ", img ,status:'Active'},
];
export default function RegisterTrack() {
  const {auth}= useAuthContext();
  let id=null;
  if(auth)
    id=Extract(auth, "nameid");
  // const {data:myTracks,isLoading}=useGetApplicantTrack(id);
  console.log(auth,'insude my track page')
  // if(auth==null)
  //  return  <Navigate to='/login' />
  // if(tracks?.data?.length==0 && !isLoading)
  //   return <Navigate />

  return (
    <div className="mt-8 flex flex-col items-center xl:items-start gap-y-8  ">
      {myTracks.map((myTrack, ind) => (
        <TrackItem key={ind} name={myTrack.trackName} trackId={myTrack.trackId}  img={myTrack.img} status={myTrack.status}/>
      ))}
    </div>
  );
}
