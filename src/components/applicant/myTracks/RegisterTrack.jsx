import { Navigate } from "react-router-dom";
import img from "../../../assets/img/tracks/frontEnd.png";
import { useAuthContext } from "../../../contexts/AuthProvider";
import useGetApplicantTrack from "../../../hooks/applicant/enroll/useGetApplicantTrack";
import Extract from "../../../utils/Extract";
import ProgressBar from "./ProgressBar";
import TrackItem from "./TrackItem";

export default function RegisterTrack() {
  const { auth } = useAuthContext();
  const id = Extract(auth, "nameid");
  const { data, isLoading } = useGetApplicantTrack(id);
  console.log("track data", data);
  const myTrack = data?.data?.data || [];
  if (!auth) return <Navigate to="/login" />;
  if (!isLoading && myTrack.length === 0) {
    return <Navigate to="/unAuthorized" />; 
  }

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center gap-y-8">
      {myTrack.map((track, ind) => (
        <TrackItem
          key={ind}
          enrollmentId={track.id}
          name={track.trackName}
          trackId={track.trackId}
          img={track.img || img}
          status={track.status}
          enrollmentDate={track.enrollmentDate}
        />
      ))}
    </div>
  );
}
