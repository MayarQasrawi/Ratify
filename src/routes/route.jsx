import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layouts/Dashboard";
import AdminHome from "../pages/AdminHome";
import SeniorHome from "../pages/SeniorHome";
import { AuthProvider } from "../contexts/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import AuthLayout from "../layouts/AuthLayout";
import AdminTrack from "../pages/AdminTrack";
import Team from "../pages/Team";
import Login from "../components/view/Login";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/user/Home";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <Home /> }],
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
