import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layouts/Dashboard";
import AdminHome from "../pages/admin/AdminHome";
import SeniorHome from "../pages/SeniorHome";
import { AuthProvider } from "../contexts/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import AdminTrack from "../pages/admin/track/Track";
import Team from "../pages/admin/Team";
import Login from "../components/view/Login";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/user/Home";
import ExpertsPage from "../pages/user/ExpertsPage";
import TrackPage from "../pages/user/TrackPage";
import Register from "../components/view/Register";
import ForgetPassword from "../pages/general/ForgetPassword";
import MyTracksPage from "../pages/applicant/MyTracksPage";
import TrackDetailsPage from "../pages/user/TrackDetailsPage";
import UnAuthorized from "../pages/general/UnAuthorized";
import NotFoundPage from "../pages/general/NotFoundPage";
import ResetPassword from "../pages/general/ResetPassword";
import TrackSetup from "../pages/admin/track/TrackSetup";
import Applicants from "../components/admin/Applicants";
import StudentRankingDashboard from "../components/StudentRankingDashboard "
import ViewDetailes from "../pages/admin/ViewDetailes";
import Deriver from "../components/applicant/dashboard/deriver";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "our-tracks", element: <TrackPage /> },
      { path: "our-experts", element: <ExpertsPage /> },
      { path: "my-tracks", element: <MyTracksPage /> },
      { path: "track-details/:id", element: <TrackDetailsPage /> },
      // {path:"stages", element:<Stages/>}
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  { path: "signup", element: <Register /> },
  { path: "forgetPassword", element: <ForgetPassword /> },
  { path: "resetPassword", element: <ResetPassword /> },
  { path: "unAuthorized", element: <UnAuthorized /> },
  
  
  
  {path:"/dashboard/applicants/", element:<Deriver />},
  
  {
    path: "/dashboard",
    element: (
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    ),

    children: [
      {
        path: "admin",
        // element: <ProtectedRoute allowRole="Admin" />,
        children: [
          { index: true, element: <AdminHome /> },
          { path: "teams", element: <Team /> },
          { path: "tracks", element: <AdminTrack /> },
          { path: "tracks/setup", element: <TrackSetup /> },
          { path: "applicants", element: <Applicants /> },
          {path:"ViewDetailes/:id", element:<ViewDetailes/>}
        ],
      },
      {
        path: "seniorExaminer",
        // element: <ProtectedRoute allowRole="Examiner" />,
        children: [{ index: true, element: <SeniorHome /> }],
      },
      {
        path: "examiner",
        // element: <ProtectedRoute allowRole="seniorExaminer" />,
        children: [{ index: true, element: <SeniorHome /> }],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
