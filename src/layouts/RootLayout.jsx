import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/user/shared/Navbar";

export default function RootLayout() {
  const location=useLocation()
  return (
    <>
   { !location.pathname.includes('track-details') &&  <Navbar  />}
      <Outlet />
    </>
  )
}
