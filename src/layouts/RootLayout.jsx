import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/user/shared/Navbar";
import Footer from "../components/user/shared/Footer";
import TopLoader from "../components/shared/TopLoader";
import useGetApplicantTrack from "../hooks/applicant/enroll/useGetApplicantTrack";
import { useAuthContext } from "../contexts/AuthProvider";
import Extract from "../utils/Extract";

export default function RootLayout() {
  const {auth}=useAuthContext()
  let id=null;
  if(auth)
    id = Extract(auth, "nameid");
   const {data:tracks,isLoading}=useGetApplicantTrack(id)
  console.log(isLoading,'inside root')
  const location = useLocation();
  
  return (
    <>
      <TopLoader isLoading={isLoading} />
      {!location.pathname.includes("track-details") && <Navbar />}
      <div className="min-h-screen ">
      <Outlet />
      </div>
       
      <Footer /> 
      </> 
  );
}
