import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/user/shared/Navbar";
import Footer from "../components/user/shared/Footer";

export default function RootLayout() {
  const location = useLocation();
  return (
    <>
      {!location.pathname.includes("track-details") && <Navbar />}
      <Outlet />
      <Footer />
    </>
  );
}
