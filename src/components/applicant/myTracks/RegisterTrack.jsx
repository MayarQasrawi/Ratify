import { Navigate } from "react-router-dom";
import img from "../../../assets/img/tracks/frontEnd.png";
import { useAuthContext } from "../../../contexts/AuthProvider";
import useGetApplicantTrack from "../../../hooks/applicant/enroll/useGetApplicantTrack";
import Extract from "../../../utils/Extract";
import ProgressBar from "./ProgressBar";
import TrackItem from "./TrackItem";
const myTracks = [
  { trackId: 1, trackName: "Front End ", img ,status:'Active',enrollmentDate:'2025-04-17T13:00:51.578181'},
  { trackId: 2, trackName: "Basics ", img ,status:'Active',enrollmentDate:'2025-04-17T13:52:17.781583'},
];
export default function RegisterTrack() {
  const {auth}= useAuthContext();
  let id=null;
  if(auth)
    id=Extract(auth, "nameid");
  const {data:myTrack,isLoading}=useGetApplicantTrack(id);
  console.log(myTrack?.data,'inside applicant dashbored ///////////////////////////////////')
  console.log(auth,'insude my track page')
  // if(auth==null)
  //  return  <Navigate to='/login' />
  // if(tracks?.data?.length==0 && !isLoading)
  //   return <Navigate to='/' />

  return (
    <div className="mt-8 flex flex-col items-center xl:items-start gap-y-8  ">
      {myTrack && myTrack?.data?.data.map((myTrack, ind) => (
        <TrackItem key={ind} name={myTrack.trackName} trackId={myTrack.trackId}  img={myTrack?.img} status={myTrack.status} enrollmentDate={myTrack.enrollmentDate}/>
      ))}
    </div>
  );
}
