import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/user/shared/Navbar";
import Footer from "../components/user/shared/Footer";
import useApplicantTrack from "../hooks/applicant/useApplicantTrack";
import TopLoader from "../components/shared/TopLoader";

export default function RootLayout() {
//  const {data,isLoading, isSuccess}= useApplicantTrack('1')
  // const location = useLocation();

  return (
    <>
     {/* <TopLoader isLoading={isLoading} /> */}
      {!location.pathname.includes("track-details") && <Navbar />}
       <Outlet />
      <Footer /> 
      </> 
  );
}
