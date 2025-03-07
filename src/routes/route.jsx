import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layouts/Dashboard";
import AdminHome from "../pages/admin/AdminHome";
import SeniorHome from "../pages/SeniorHome";
import { AuthProvider } from "../contexts/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import AuthLayout from "../layouts/AuthLayout";
import AdminTrack from "../pages/admin/AdminTrack";
import Team from "../pages/admin/Team";
import Login from "../components/view/Login";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/user/Home";
import Tracks from "../pages/user/Tracks";
import Experts from "../pages/user/Experts";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "Tracks", element: <Tracks /> },
      { path: "Experts", element: <Experts /> },
    ],
  },
  {
    path: "/auth",
    elment: <div>AuthLayout</div>,
    children: [{ path: "login", element: <Login /> }],
  },
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
        element: <ProtectedRoute allowRole="admin" />,
        children: [
          { index: true, element: <AdminHome /> },
          { path: "teams", element: <Team /> },
          { path: "tracks", element: <AdminTrack /> },
        ],
      },
      {
        path: "seniorExaminer",
        element: <ProtectedRoute allowRole="seniorExaminer" />,
        children: [{ index: true, element: <SeniorHome /> }],
      },
    ],
  },
]);
